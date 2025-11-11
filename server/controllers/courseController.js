import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * ✅ CREATE a new course
 */
export const createCourse = async (req, res) => {
  try {
    const { id, courseCode, name, semester, teacherId } = req.body;

    if (!id || !courseCode || !name || !semester || !teacherId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("📩 Incoming Course Data:", req.body);

    const newCourse = await prisma.course.create({
      data: { id, courseCode, name, semester, teacherId },
    });

    console.log("✅ Course created:", newCourse);
    res.status(201).json({ message: "Course created successfully", data: newCourse });
  } catch (error) {
    console.error("❌ Error creating course:", error);
    res.status(500).json({
      message: "Failed to create course",
      error: error.message,
    });
  }
};

/**
 * ✅ READ all courses (with pagination, filters, and relations)
 */
export const getAllCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, semester, teacherId, search } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const filters = {};
    if (semester) filters.semester = semester;
    if (teacherId) filters.teacherId = teacherId;
    if (search) {
      filters.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { courseCode: { contains: search, mode: "insensitive" } },
      ];
    }

    const [courses, totalCourses] = await Promise.all([
      prisma.course.findMany({
        where: filters,
        skip,
        take,
        include: {
          teacher: {
            select: {
              id: true,
              user: { select: { username: true } },
            },
          },
          students: {
            select: {
              id: true,
              user: { select: { username: true } },
            },
          },
          attendance: {
            select: {
              id: true,
              date: true,
              status: true,
            },
          },
        },
      }),
      prisma.course.count({ where: filters }),
    ]);

    res.json({
      page: parseInt(page),
      limit: take,
      totalCourses,
      totalPages: Math.ceil(totalCourses / take),
      data: courses,
    });
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    res.status(500).json({
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

/**
 * ✅ READ a single course by ID (with students + teacher info)
 */
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        students: {
          include: {
            user: { select: { id: true, username: true } },
          },
        },
        teacher: {
          include: {
            user: { select: { id: true, username: true } },
          },
        },
      },
    });

    if (!course) return res.status(404).json({ message: "Course not found" });

    const response = {
      id: course.id,
      name: course.name,
      courseCode: course.courseCode,
      teacherName: course.teacher?.user?.name || "Unknown Teacher",
      teacherUsername: course.teacher?.user?.username || "N/A",
      materials: course.materials || [],
    };
    
    res.json({ message: "Course fetched successfully", data: course });
  } catch (error) {
    console.error("❌ Error fetching course:", error);
    res.status(500).json({
      message: "Failed to fetch course",
      error: error.message,
    });
  }
};

/**
 * ✅ UPDATE a course
 */
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseCode, name, semester, teacherId } = req.body;

    const existingCourse = await prisma.course.findUnique({ where: { id } });
    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        courseCode: courseCode ?? existingCourse.courseCode,
        name: name ?? existingCourse.name,
        semester: semester ?? existingCourse.semester,
        teacherId: teacherId ?? existingCourse.teacherId,
      },
    });

    res.json({
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("❌ Error updating course:", error);
    res.status(500).json({
      message: "Failed to update course",
      error: error.message,
    });
  }
};

/**
 * ✅ DELETE a course
 */
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCourse = await prisma.course.findUnique({ where: { id } });
    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    await prisma.course.delete({ where: { id } });

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting course:", error);
    res.status(500).json({
      message: "Failed to delete course",
      error: error.message,
    });
  }
};

/**
 * ✅ GET all students enrolled in a specific course
 */
export const getStudentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        students: {
          include: {
            user: { select: { id: true, username: true } },
          },
        },
      },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({
      message: "Students fetched successfully",
      data: course.students,
    });
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    res.status(500).json({
      message: "Failed to fetch students",
      error: error.message,
    });
  }
};

// 📗 Get all materials for a course
export const getCourseMaterials = async (req, res) => {
  const { courseId } = req.params;

  try {
    const materials = await prisma.material.findMany({
      where: { courseId },
      orderBy: { createdAt: "desc" },
    });

    res.json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ message: "Failed to fetch materials." });
  }
};

// 📘 Add new course material (with file or text)
export const addCourseMaterial = async (req, res) => {
  const { courseId } = req.params;
  const { title } = req.body;

  try {
    let fileUrl = null;
    if (req.file) {
      fileUrl = `http://localhost:4000/uploads/${req.file.filename}`;
    }

    const material = await prisma.material.create({
      data: {
        title: title || "Untitled Material",
        fileUrl,
        courseId,
      },
    });

    res.json({ message: "Material uploaded successfully!", material });
  } catch (error) {
    console.error("Error adding material:", error);
    res.status(500).json({ message: "Failed to upload material." });
  }
};

// ❌ Delete a material
export const deleteCourseMaterial = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.material.delete({
      where: { id },
    });

    res.json({ message: "Material deleted successfully!" });
  } catch (error) {
    console.error("Error deleting material:", error);
    res.status(500).json({ message: "Failed to delete material." });
  }
};

// ✅ 2. Create a new assignment
export const addAssignment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, dueDate, teacherId } = req.body;

    const assignment = await prisma.assignment.create({
      data: { title, description, dueDate: new Date(dueDate), courseId, teacherId },
    });

    res.json({ success: true, data: assignment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create assignment" });
  }
};

// ✅ 1. Get assignments for a specific course
export const getCourseAssignments = async (req, res) => {
  try {
    const { courseId } = req.params;
    const assignments = await prisma.assignment.findMany({
      where: { courseId },
      include: { submissions: true },
    });
    res.json({ success: true, data: assignments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch assignments" });
  }
};