import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ✅ Create a new teacher
export const createTeacher = async (req, res) => {
  try {
    const { id, userId } = req.body;

    if (!id || !userId) {
      return res.status(400).json({ message: "id and userId are required" });
    }

    const teacher = await prisma.teacher.create({
      data: {
        id,
        userId,
      },
    });

    res.status(201).json({
      message: "Teacher created successfully",
      teacher,
    });
  } catch (error) {
    console.error("Error creating teacher:", error);
    res.status(500).json({
      message: "Failed to create teacher",
      error: error.message,
    });
  }
};

// ✅ GET /api/teachers/:teacherId
export const getTeacherById = async (req, res) => {
  try {
    const { teacherId } = req.params;

    console.log("📡 Fetching teacher profile for:", teacherId);

    if (!teacherId) {
      return res.status(400).json({ message: "Teacher ID is required" });
    }

    const teacher = await prisma.teacher.findUnique({
      where: { id: teacherId },
      include: {
        user: {
          select: {
            name: true,
            username: true,
          },
        },
      },
    });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json({
      message: "✅ Teacher profile fetched successfully",
      data: teacher,
    });
  } catch (error) {
    console.error("❌ Error fetching teacher profile:", error);
    res.status(500).json({
      message: "Failed to fetch teacher profile",
      error: error.message,
    });
  }
};

// ✅ Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany({
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
      message: "✅ Teachers fetched successfully",
      data: teachers,
    });
  } catch (error) {
    console.error("❌ Error fetching teachers:", error);
    res.status(500).json({
      message: "Failed to fetch teachers",
      error: error.message,
    });
  }
};

// 📘 Get all courses by a specific teacher
export const getTeacherCourses = async (req, res) => {
  try {
    const { teacherId } = req.params;

    if (!teacherId) {
      return res.status(400).json({ message: "Teacher ID is required" });
    }

    // Fetch teacher’s courses
    const teacher = await prisma.teacher.findUnique({
      where: { id: teacherId },
      include: { courses: true },
    });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json(teacher.courses);
  } catch (error) {
    console.error("Error fetching teacher courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

