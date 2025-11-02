import express from "express";
import {
  uploadMaterial,
  getMaterials,
  deleteMaterial,
} from "../controllers/materialController.js";

const router = express.Router();

router.post("/:courseId/materials", uploadMaterial);
router.get("/:courseId/materials", getMaterials);
router.delete("/:courseId/materials/:id", deleteMaterial);

export default router;
