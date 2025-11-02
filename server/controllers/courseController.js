import prisma from "../prismaClient.js";


export const createCourse = async (req, res) => {
  try {
    const { id, courseCode, name, semester, teacherId } = req.body;

    console.log("📩 Incoming Data:", req.body); // 👈 debug log

    const newCourse = await prisma.course.create({
      data: {
        id,
        courseCode,
        name,
        semester,
        teacherId
      },
    });

    console.log("✅ Course created:", newCourse);
    res.status(201).json(newCourse);

  } catch (error) {
    console.error("❌ Prisma Error:", error);
    res.status(500).json({
      message: "Failed to create course",
      error: error.message || error
    });
  }
};

// ✅ READ all courses
export const getAllCourses = async (req, res) => {
  try {
    // 🔹 Extract query parameters
    const { page = 1, limit = 10, semester, teacherId, search } = req.query;

    const skip = (page - 1) * limit;
    const take = parseInt(limit);

    // 🔹 Build dynamic filters
    const filters = {};

    if (semester) filters.semester = semester;
    if (teacherId) filters.teacherId = teacherId;
    if (search) {
      filters.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { courseCode: { contains: search, mode: "insensitive" } },
      ];
    }

    // 🔹 Fetch data with filters, pagination, and teacher info
    const courses = await prisma.course.findMany({
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
        students: { select: { id: true } },
      },
    });

    // 🔹 Total count for pagination
    const totalCourses = await prisma.course.count({ where: filters });

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

// ✅ READ single course by ID
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        teacher: true,
        students: true,
        attendance: true,
        assignments: {
          include: {
            submissions: true,
          },
        },
      },
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json({
      message: "Course fetched successfully",
      data: course,
    });
  } catch (error) {
    console.error("❌ Error fetching course:", error);
    res.status(500).json({
      message: "Failed to fetch course",
      error: error.message,
    });
  }
};

// ✅ UPDATE course
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseCode, name, semester, teacherId } = req.body;

    // Validate input
    if (!courseCode && !name && !semester && !teacherId) {
      return res.status(400).json({
        message: "At least one field must be provided to update",
      });
    }

    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Update course
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

// ✅ DELETE course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Delete the course
    await prisma.course.delete({
      where: { id },
    });

    res.json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting course:", error);
    res.status(500).json({
      message: "Failed to delete course",
      error: error.message,
    });
  }
};

