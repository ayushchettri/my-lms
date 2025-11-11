import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ GET /api/admins/:id
export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("📡 Fetching admin profile for user ID:", id);

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const admin = await prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        username: true,
        role: true,
      },
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      message: "✅ Admin profile fetched successfully",
      data: admin,
    });
  } catch (error) {
    console.error("❌ Error fetching admin profile:", error);
    res.status(500).json({
      message: "Failed to fetch admin profile",
      error: error.message,
    });
  }
};

// ✅ Get all semesters and student count
export const getSemestersWithStudentCount = async (req, res) => {
  try {
    const semesters = await prisma.student.groupBy({
      by: ["semester"],
      _count: { id: true },
    });

    const formatted = semesters.map((s) => ({
      semester: s.semester,
      studentCount: s._count.id,
    }));

    res.json({
      message: "✅ Semesters fetched successfully",
      data: formatted,
    });
  } catch (error) {
    console.error("❌ Error fetching semesters:", error);
    res.status(500).json({
      message: "Failed to fetch semesters",
      error: error.message,
    });
  }
};

// ✅ Get students and attendance by semester
export const getStudentsBySemester = async (req, res) => {
  try {
    const { semester } = req.params; // e.g. "7th"

    if (!semester) {
      return res.status(400).json({ message: "Semester is required" });
    }

    const students = await prisma.student.findMany({
      where: { semester },
      include: {
        user: {
          select: { name: true, username: true },
        },
        attendance: {
          select: { status: true },
        },
      },
    });

    // 🧮 Calculate attendance %
    const formatted = students.map((s) => {
      const total = s.attendance.length;
      const present = s.attendance.filter((a) => a.status === "Present").length;
      const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : "0.00";

      return {
        studentId: s.id,
        name: s.user.name,
        username: s.user.username,
        semester: s.semester,
        attendance: `${percentage}%`,
      };
    });

    res.json({
      message: `✅ Students fetched for ${semester}`,
      data: formatted,
    });
  } catch (error) {
    console.error("❌ Error fetching students by semester:", error);
    res.status(500).json({
      message: "Failed to fetch students by semester",
      error: error.message,
    });
  }
};

//CREATE COURSE
export const createCourse = async (req, res) => {
  try {
    const { name, courseCode, semester, teacherId } = req.body;

    if (!name || !courseCode || !semester || !teacherId)
      return res.status(400).json({ message: "All fields required" });

    // ✅ Create new course
    const course = await prisma.course.create({
      data: {
        name,
        courseCode,
        semester,
        teacherId,
      },
    });

    // ✅ Fetch all students from that semester and link them automatically
    const students = await prisma.student.findMany({
      where: { semester },
      select: { id: true },
    });

    if (students.length > 0) {
      await prisma.course.update({
        where: { id: course.id },
        data: {
          students: {
            connect: students.map((s) => ({ id: s.id })),
          },
        },
      });
    }

    res.status(201).json({
      message: "✅ Course created successfully",
      data: course,
    });
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//GET COURSE
export const getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        teacher: {
          include: {
            user: true,
          },
        },
      },
    });

    res.json({
      message: "✅ Courses fetched successfully",
      data: courses.map((c) => ({
        id: c.id,
        name: c.name,
        courseCode: c.courseCode,
        semester: c.semester,
        teacher: c.teacher?.user?.name || "Unassigned",
      })),
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses" });
  }
};

//DELETE COURSE
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.course.delete({ where: { id } });
    res.json({ message: "🗑️ Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting course" });
  }
};

/** 🔹 Get all students */
export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: { user: true },
    });
    res.json(students); // ✅ return array directly
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
};

/** 🔹 Get all teachers */
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany({
      include: { user: true }, // 👈 ensures user data (name, username, etc.) comes with teacher
    });
    res.json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Error fetching teachers" });
  }
};

// ✅ Add a teacher (also creates user)
export const createTeacher = async (req, res) => {
  try {
    const { id, name, username, password } = req.body;

    if (!id || !name || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // create user first
    const user = await prisma.user.create({
      data: {
        id: uuidv4(), // e.g. if id = T006 => user.id = U006
        username,
        password,
        role: "teacher",
        name,
      },
    });

    // create teacher
    const teacher = await prisma.teacher.create({
      data: {
        id,
        userId: user.id,
      },
    });

    res.status(201).json({ message: "Teacher created successfully", teacher });
  } catch (error) {
    console.error("Error creating teacher:", error);
    res.status(500).json({ message: "Error creating teacher", error: error.message });
  }
};

// ✅ Delete teacher (also deletes linked user)
export const deleteTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params; // ✅ Use teacherId, not id

    if (!teacherId) {
      return res.status(400).json({ message: "Teacher ID is required" });
    }

    // ✅ Check if teacher exists
    const teacher = await prisma.teacher.findUnique({
      where: { id: teacherId },
    });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // ✅ Delete the teacher first
    await prisma.teacher.delete({ where: { id: teacherId } });

    // ✅ Then delete the corresponding user
    await prisma.user.delete({ where: { id: teacher.userId } });

    res.json({ message: "✅ Teacher deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting teacher:", error);
    res.status(500).json({
      message: "Failed to delete teacher",
      error: error.message,
    });
  }
};

// 📘 Create new student
export const createStudent = async (req, res) => {
  try {
    const { id, name, username, password, semester } = req.body;

    if (!id || !name || !username || !password || !semester) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        username,
        password,
        role: "student",
        name,
      },
    });

    const student = await prisma.student.create({
      data: {
        id,
        userId: user.id,
        semester,
      },
    });

    res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    console.error("❌ Error creating student:", error);
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Username already exists" });
    }
    res.status(500).json({ message: "Error creating student", error: error.message });
  }
};

// 📘 Delete student
export const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    // Step 1: Find the student and their userId
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Step 2: Delete the student record first
    await prisma.student.delete({
      where: { id: studentId },
    });

    // Step 3: Delete the linked user
    await prisma.user.delete({
      where: { id: student.userId },
    });

    res.json({ message: "✅ Student and linked user deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting student:", error);
    res.status(500).json({
      message: "Failed to delete student",
      error: error.message,
    });
  }
};