import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 📘 CREATE Student
export const createStudent = async (req, res) => {
  try {
    const { id, userId, semester } = req.body;

    if (!id || !userId || !semester) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = await prisma.student.create({
      data: { id, userId, semester },
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Failed to create student", error: error.message });
  }
};

// 📗 GET all Students
export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        user: {
          select: {
            name: true,
            username: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "✅ Students fetched successfully",
      data: students,
    });
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    res.status(500).json({
      message: "Failed to fetch students",
      error: error.message,
    });
  }
};

// 📙 GET single Student
export const getStudentById = async (req, res) => {
  try {
    const { studentId } = req.params; // The value coming from URL, could be user.id or student.id
    console.log("📡 Fetching student profile for:", studentId);

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    // 🔍 Try to find student by student.id first
    let student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: {
          select: {
            name: true,
            username: true,
          },
        },
      },
    });

    // 🔍 If not found, try finding by userId
    if (!student) {
      student = await prisma.student.findUnique({
        where: { userId: studentId },
        include: {
          user: {
            select: {
              name: true,
              username: true,
            },
          },
        },
      });
    }

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "✅ Student profile fetched successfully",
      data: student,
    });
  } catch (error) {
    console.error("❌ Error fetching student profile:", error);
    res.status(500).json({
      message: "Failed to fetch student profile",
      error: error.message,
    });
  }
};


// 📕 UPDATE Student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { semester } = req.body;

    const student = await prisma.student.update({
      where: { id },
      data: { semester },
    });

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Failed to update student", error: error.message });
  }
};

// ❌ DELETE Student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.student.delete({ where: { id } });
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete student", error: error.message });
  }
};

// GET Course by Student
export const getCoursesByStudent = async (req, res) => {
  try {
    const { id } = req.params; // studentId

    if (!id) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    // ✅ Fetch student + courses + teacher info
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        courses: {
          include: {
            teacher: {
              include: {
                user: {
                  select: { name: true, username: true },
                },
              },
            },
          },
        },
        user: {
          select: { name: true, username: true },
        },
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const formattedCourses = student.courses.map((course) => ({
      id: course.id,
      name: course.name,
      courseCode: course.courseCode || "N/A",
      semester: course.semester || "N/A",
      teacher:
        course.teacher?.user?.name ||
        course.teacher?.user?.username ||
        "Unknown",
    }));

    res.json({
      message: "✅ Courses fetched successfully",
      data: formattedCourses,
      student: {
        id: student.id,
        name: student.user?.name || student.user?.username,
        semester: student.semester, // ✅ semester from Student model
      },
    });
  } catch (error) {
    console.error("❌ Error fetching student courses:", error);
    res.status(500).json({
      message: "Failed to fetch student courses",
      error: error.message,
    });
  }
};

//GET student profile
export const getStudentProfile = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: {
          select: {
            name: true,
            username: true,
          },
        },
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "✅ Student profile fetched successfully",
      data: {
        id: student.id,
        name: student.user?.name || "N/A",
        username: student.user?.username || "N/A",
        semester: student.semester || "N/A",
      },
    });
  } catch (error) {
    console.error("❌ Error fetching student profile:", error);
    res.status(500).json({
      message: "Failed to fetch student profile",
      error: error.message,
    });
  }
};

// ✅ Get all assignments for a student's enrolled courses
export const getStudentAssignments = async (req, res) => {
  try {
    const { studentId } = req.params;

    // find all courses the student is enrolled in
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { courses: true },
    });

    if (!student) return res.status(404).json({ message: "Student not found" });

    const courseIds = student.courses.map((c) => c.id);

    const assignments = await prisma.assignment.findMany({
      where: { courseId: { in: courseIds } },
      include: { course: true },
      orderBy: { dueDate: "asc" },
    });

    res.json(assignments);
  } catch (error) {
    console.error("Error fetching student assignments:", error);
    res.status(500).json({ message: "Error fetching assignments" });
  }
};

// ✅ Get all submissions by this student
export const getStudentSubmissions = async (req, res) => {
  try {
    const { studentId } = req.params;

    const submissions = await prisma.submission.findMany({
      where: { studentId },
      include: {
        assignment: { select: { title: true, dueDate: true } },
      },
      orderBy: { submittedAt: "desc" },
    });

    res.json(submissions);
  } catch (error) {
    console.error("Error fetching student submissions:", error);
    res.status(500).json({ message: "Error fetching submissions" });
  }
};

// ✅ Submit an assignment
export const submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { studentId } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!fileUrl) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const submission = await prisma.submission.create({
      data: {
        assignmentId,
        studentId,
        content: fileUrl,
      },
    });

    res.json({ message: "Assignment submitted successfully!", submission });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    res.status(500).json({ message: "Failed to submit assignment" });
  }
};