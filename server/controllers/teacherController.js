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
