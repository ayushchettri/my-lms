import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ CREATE Submission
export const createSubmission = async (req, res) => {
  try {
    const { id, assignmentId, studentId, content } = req.body;

    if (!id || !assignmentId || !studentId || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const submission = await prisma.submission.create({
      data: {
        id,
        assignmentId,
        studentId,
        content,
      },
    });

    res.status(201).json({
      message: "Submission created successfully",
      submission,
    });
  } catch (error) {
    console.error("❌ Error creating submission:", error);
    res.status(500).json({
      message: "Failed to create submission",
      error: error.message,
    });
  }
};

// ✅ READ - All submissions
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await prisma.submission.findMany({
      include: {
        assignment: { select: { id: true, title: true } },
        student: { select: { id: true, user: { select: { username: true } } } },
      },
    });

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch submissions",
      error: error.message,
    });
  }
};

// ✅ READ - Submission by ID
export const getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await prisma.submission.findUnique({
      where: { id },
      include: {
        assignment: { select: { id: true, title: true } },
        student: { select: { id: true, user: { select: { username: true } } } },
      },
    });

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch submission",
      error: error.message,
    });
  }
};

// ✅ UPDATE - Submission
export const updateSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { remarks } = req.body;

    const updated = await prisma.submission.update({
      where: { id },
      data: { remarks },
    });

    res.json({ message: "Remarks added successfully", updated });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update submission",
      error: error.message,
    });
  }
};

// ✅ DELETE - Submission
export const deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.submission.delete({ where: { id } });
    res.json({ message: "Submission deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete submission",
      error: error.message,
    });
  }
};