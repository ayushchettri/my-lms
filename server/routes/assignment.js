import express from "express";
import {
  getSubmissions,
  submitAssignment,
  upload,
} from "../controllers/assignmentController.js";

const router = express.Router();

// ✅ Student submission routes
router.get("/:assignmentId/submissions", getSubmissions);
router.post("/:assignmentId/submit", upload.single("file"), submitAssignment);

export default router;
  