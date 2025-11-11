import express from "express";
import multer from "multer";
import {
  getCourseAssignments,
  addAssignment,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  getStudentsByCourse,
  getCourseMaterials,
  addCourseMaterial,
  deleteCourseMaterial,
} from "../controllers/courseController.js";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

// 🗂️ Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ✅ Create a course
router.post("/", createCourse);

// ✅ Get all courses (with optional teacherId filter)
router.get("/", async (req, res) => {
  try {
    const { teacherId } = req.query;

    const courses = await prisma.course.findMany({
      where: teacherId ? { teacherId } : {},
      include: {
        students: {
          include: {
            user: { select: { username: true } },
          },
        },
        teacher: {
          include: {
            user: { select: { username: true } },
          },
        },
      },
    });

    res.json({ data: courses });
  } catch (err) {
    console.error("❌ Error fetching courses:", err);
    res.status(500).json({
      message: "Error fetching courses",
      error: err.message,
    });
  }
});

// ✅ Get course by ID
router.get("/:id", getCourseById);

// ✅ Update course
router.put("/:id", updateCourse);

// ✅ Delete course
router.delete("/:id", deleteCourse);

// ✅ Get all students of a course
router.get("/:courseId/students", getStudentsByCourse);


router.get("/:courseId/materials", getCourseMaterials);
router.post("/:courseId/materials", upload.single("file"), addCourseMaterial);
router.delete("/:courseId/materials/:id", deleteCourseMaterial);
router.get("/:courseId/assignments", getCourseAssignments);
router.post("/:courseId/assignments", addAssignment);

export default router;
