import express from "express";
import { getAdminById, 
        getSemestersWithStudentCount,
        getStudentsBySemester,
        getAllCourses,
        createCourse,
        deleteCourse,
        getAllTeachers,
        getAllStudents,
        createTeacher,
        deleteTeacher,
        createStudent,
        deleteStudent,
} from "../controllers/adminController.js";

const router = express.Router();

// No authentication middleware here
router.get("/semesters", getSemestersWithStudentCount);
router.get("/students-by-semester/:semester", getStudentsBySemester);
router.get("/courses", getAllCourses);
router.post("/courses", createCourse);
router.delete("/courses/:id", deleteCourse);
router.get("/students", getAllStudents);
router.get("/teachers", getAllTeachers);
router.post("/teachers", createTeacher);
router.delete("/teachers/:teacherId", deleteTeacher);
router.post("/students", createStudent);
router.delete("/students/:studentId", deleteStudent);
router.get("/:id", getAdminById);

export default router;
