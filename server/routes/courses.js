import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router.post("/", createCourse);        // Create
router.get("/", getAllCourses);        // Read all
router.get("/:id", getCourseById);     // Read one
router.put("/:id", updateCourse);      // Update
router.delete("/:id", deleteCourse);   // Delete

export default router;
