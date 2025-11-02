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
export const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: { user: true, courses: true },
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students", error: error.message });
  }
};

// 📙 GET single Student
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
      where: { id },
      include: { user: true, courses: true },
    });

    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student", error: error.message });
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
