import express from "express";
import { createTeacher,
        getTeacherById,
        getAllTeachers,
        getTeacherCourses,
} from "../controllers/teacherController.js";

const router = express.Router();

router.get("/:teacherId/courses", getTeacherCourses);
router.post("/", createTeacher);
router.get("/:teacherId", getTeacherById);
router.get("/", getAllTeachers);

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
