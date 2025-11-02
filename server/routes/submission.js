import express from "express";
import {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
} from "../controllers/submissionController.js";

const router = express.Router();

router.post("/", createSubmission);
router.get("/", getAllSubmissions);
router.get("/:id", getSubmissionById);
router.put("/:id", updateSubmission);
router.delete("/:id", deleteSubmission);

export default router;
