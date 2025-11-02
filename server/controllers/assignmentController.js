import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ CREATE Assignment
export const createAssignment = async (req, res) => {
  try {
    const { id, title, description, dueDate, courseId, teacherId } = req.body;

    if (!id || !title || !description || !courseId || !teacherId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const assignment = await prisma.assignment.create({
      data: {
        id,
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : new Date(),
        courseId,
        teacherId,
      },
    });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create assignment",
      error: error.message,
    });
  }
};

// ✅ READ - Get all assignments
export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await prisma.assignment.findMany({
      include: {
        course: { select: { id: true, name: true } },
        teacher: { select: { id: true, user: { select: { username: true } } } },
      },
    });

    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch assignments",
      error: error.message,
    });
  }
};

// ✅ READ - Get assignment by ID
export const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await prisma.assignment.findUnique({
      where: { id },
      include: {
        course: { select: { id: true, name: true } },
        teacher: { select: { id: true, user: { select: { username: true } } } },
      },
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch assignment",
      error: error.message,
    });
  }
};

// ✅ UPDATE - Assignment
export const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;

    const updated = await prisma.assignment.update({
      where: { id },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update assignment",
      error: error.message,
    });
  }
};

// ✅ DELETE - Assignment
export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.assignment.delete({ where: { id } });

    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete assignment",
      error: error.message,
    });
  }
};
