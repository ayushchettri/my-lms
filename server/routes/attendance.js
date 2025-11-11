import express from "express";
import {
  createAttendance,
  getAttendanceByCourseAndDate,
  getAttendanceSummary,
  getAttendanceByCourse,
  deleteAttendance,
  getAttendanceByStudent,
} from "../controllers/attendanceController.js";

const router = express.Router();

// ✅ Routes
router.post("/bulk", createAttendance); // POST /api/attendance/bulk
router.get("/course/:courseId", getAttendanceByCourseAndDate); // GET /api/attendance/course/:courseId?date=2025-10-29
router.get("/summary/:courseId", getAttendanceSummary);
router.get("/course/all/:courseId", getAttendanceByCourse);
router.get("/student/:studentId", getAttendanceByStudent);
router.delete("/:id", deleteAttendance);

export default router;
