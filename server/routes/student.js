import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getCoursesByStudent,
  getStudentProfile,
  getStudentAssignments,
  getStudentSubmissions,
  submitAssignment
} from "../controllers/studentController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", createStudent);
router.get("/", getAllStudents);
router.get("/:studentId", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.get("/:id/courses", getCoursesByStudent);
router.get("/profile/:studentId", getStudentProfile);
router.get("/:studentId/assignments", getStudentAssignments);
router.get("/:studentId/submissions", getStudentSubmissions);
router.post("/:assignmentId/submit", upload.single("file"), submitAssignment);

export default router;
