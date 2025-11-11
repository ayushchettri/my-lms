import prisma from "../prismaClient.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/assignments";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
export const upload = multer({ storage });

// ✅ 3. Submit assignment (student side)
export const submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { studentId, content } = req.body;

    const fileUrl = req.file ? `/uploads/assignments/${req.file.filename}` : null;

    const submission = await prisma.submission.create({
      data: { assignmentId, studentId, content, fileUrl },
    });

    res.json({ success: true, data: submission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Submission failed" });
  }
};

// ✅ 4. Get all submissions for an assignment (sorted by student ID)
export const getSubmissions = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const submissions = await prisma.submission.findMany({
      where: { assignmentId },
      include: { student: true },
      orderBy: { studentId: "asc" },
    });

    res.json({ success: true, data: submissions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch submissions" });
  }
};
