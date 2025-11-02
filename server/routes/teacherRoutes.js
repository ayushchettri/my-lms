import express from "express";
import { createTeacher } from "../controllers/teacherController.js";

const router = express.Router();

router.post("/", createTeacher);

router.get("/user/:userId", async (req, res) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { userId: req.params.userId },
    });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: "Error fetching teacher", error: err.message });
  }
});

export default router;
