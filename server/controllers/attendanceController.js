import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

/*
  ✅ CREATE attendance (bulk, prevents duplicate entries per course/date)
 */
export const createAttendance = async (req, res) => {
  try {
    const { attendanceData } = req.body;

    if (!attendanceData || !Array.isArray(attendanceData) || attendanceData.length === 0) {
      return res.status(400).json({ message: "Attendance data is required" });
    }

    console.log("📥 Incoming attendance data:", attendanceData);

    const courseId = attendanceData[0].courseId;
    const date = new Date(attendanceData[0].date);

    if (!courseId || !date) {
      return res.status(400).json({ message: "Course ID and date are required" });
    }

    let updatedCount = 0;
    let createdCount = 0;

    for (const record of attendanceData) {
      const { studentId, status } = record;

      // Check if attendance exists for this student/course/date
      const existing = await prisma.attendance.findFirst({
        where: {
          courseId,
          studentId,
          date,
        },
      });

      if (existing) {
        // ✔ Update existing entry
        await prisma.attendance.update({
          where: { id: existing.id },
          data: { status },
        });
        updatedCount++;
      } else {
        // ✔ Create new attendance entry
        await prisma.attendance.create({
          data: {
            id: uuidv4(),
            courseId,
            studentId,
            status,
            date,
          },
        });
        createdCount++;
      }
    }

    console.log(`✅ Attendance processed | Updated: ${updatedCount}, Created: ${createdCount}`);

    res.status(200).json({
      message: "Attendance saved/updated successfully",
      updated: updatedCount,
      created: createdCount,
    });

  } catch (error) {
    console.error("❌ Failed to save/update attendance:", error);
    res.status(500).json({
      message: "Failed to submit attendance",
      error: error.message,
    });
  }
};


/**
 * ✅ GET attendance by course + date
 */
export const getAttendanceByCourseAndDate = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { date } = req.query;

    if (!courseId || !date) {
      return res.status(400).json({ message: "Course ID and Date are required" });
    }

    const attendanceDate = new Date(date);

    // ✅ Fetch attendance for that course on given date
    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        courseId,
        date: attendanceDate,
      },
      include: {
        student: {
          select: {
            id: true,
            user: { select: { username: true } },
          },
        },
      },
    });

    // 🧮 Fetch all attendance records for course to compute summary
    const allRecords = await prisma.attendance.findMany({
      where: { courseId },
      select: { studentId: true, status: true },
    });

    // 🧮 Build student attendance summary (present / total)
    const summaryMap = {};
    allRecords.forEach((record) => {
      if (!summaryMap[record.studentId]) {
        summaryMap[record.studentId] = { present: 0, total: 0 };
      }
      summaryMap[record.studentId].total++;
      if (record.status === "Present") summaryMap[record.studentId].present++;
    });

    // ✅ Merge today’s attendance with percentage summary
    const response = attendanceRecords.map((a) => {
      const stats = summaryMap[a.studentId] || { present: 0, total: 0 };
      const { present, total } = stats;

      const percentage =
        total > 0 ? ((present / total) * 100).toFixed(2) : "0.00";

      return {
        id: a.id,
        studentId: a.studentId,
        student: a.student,
        courseId: a.courseId,
        date: a.date,
        status: a.status,
        record: `${percentage}%`, // ✅ Percentage format
      };
    });

    res.json({
      message: "✅ Attendance fetched successfully",
      data: response,
    });
  } catch (error) {
    console.error("❌ Error loading attendance:", error);
    res.status(500).json({
      message: "Failed to load attendance",
      error: error.message,
    });
  }
};


/**
 * ✅ GET attendance summary per student for a course
 * (e.g., 7/10 → 7 presents out of 10 total classes)
 */
export const getAttendanceSummary = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    // ✅ Get all attendance records for that course
    const allRecords = await prisma.attendance.findMany({
      where: { courseId },
      select: { studentId: true, status: true, date: true },
    });

    // 🧮 Count total classes (unique dates)
    const uniqueDates = new Set(allRecords.map((r) => r.date.toISOString()));
    const totalClasses = uniqueDates.size;

    // 🧮 Count presents per student
    const studentStats = {};
    allRecords.forEach((rec) => {
      if (!studentStats[rec.studentId]) {
        studentStats[rec.studentId] = { present: 0 };
      }
      if (rec.status === "Present") studentStats[rec.studentId].present++;
    });

    // ✅ Fetch enrolled students for names
    const students = await prisma.student.findMany({
      where: { courses: { some: { id: courseId } } },
      include: { user: { select: { username: true } } },
    });

    // 🧾 Compute percentage for each student
    const summary = students.map((student) => {
      const present = studentStats[student.id]?.present || 0;
      const percentage =
        totalClasses > 0 ? ((present / totalClasses) * 100).toFixed(2) : "0.00";

      return {
        studentId: student.id,
        name: student.user.username,
        attendancePercentage: `${percentage}%`,
      };
    });

    res.json({
      message: "✅ Attendance summary fetched successfully",
      totalClasses,
      data: summary,
    });
  } catch (error) {
    console.error("❌ Error fetching attendance summary:", error);
    res.status(500).json({
      message: "Failed to fetch attendance summary",
      error: error.message,
    });
  }
};


/**
 * ✅ GET all attendance for a course (without date filter)
 */
export const getAttendanceByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const attendance = await prisma.attendance.findMany({
      where: { courseId },
      include: {
        student: {
          select: { id: true, user: { select: { username: true } } },
        },
      },
      orderBy: { date: "asc" },
    });

    res.json({
      message: "✅ Attendance records fetched successfully",
      data: attendance,
    });
  } catch (error) {
    console.error("❌ Error fetching attendance:", error);
    res.status(500).json({
      message: "Failed to load attendance",
      error: error.message,
    });
  }
};

/**
 * ✅ DELETE a specific attendance record (optional admin route)
 */
export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Attendance ID is required" });
    }

    await prisma.attendance.delete({ where: { id } });

    res.json({ message: "🗑️ Attendance record deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting attendance:", error);
    res.status(500).json({
      message: "Failed to delete attendance",
      error: error.message,
    });
  }
};

// controllers/attendanceController.js
export const getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    // ✅ Fetch all attendance for the student
    const records = await prisma.attendance.findMany({
      where: { studentId },
      include: {
        course: { select: { id: true, name: true } },
      },
    });

    // 🧮 Group by course
    const courseSummary = {};
    records.forEach((rec) => {
      const course = rec.course;
      if (!courseSummary[course.id]) {
        courseSummary[course.id] = { name: course.name, present: 0, total: 0 };
      }
      courseSummary[course.id].total++;
      if (rec.status === "Present") courseSummary[course.id].present++;
    });

    // 🎯 Convert to array with percentage
    const summaryList = Object.entries(courseSummary).map(([courseId, data]) => ({
      courseId,
      courseName: data.name,
      present: data.present,
      total: data.total,
      percentage: data.total > 0 ? ((data.present / data.total) * 100).toFixed(2) : "0.00",
    }));

    res.json({
      message: "✅ Student attendance summary fetched successfully",
      data: summaryList,
    });
  } catch (error) {
    console.error("❌ Error fetching student attendance:", error);
    res.status(500).json({
      message: "Failed to fetch student attendance",
      error: error.message,
    });
  }
};
