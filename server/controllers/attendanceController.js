import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ CREATE attendance
export const markAttendance = async (req, res) => {
  try {
    const { id, studentId, courseId, status, date } = req.body;

    if (!id || !studentId || !courseId || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const attendance = await prisma.attendance.create({
      data: {
        id,
        studentId,
        courseId,
        status,
        date: date ? new Date(date) : new Date(),
      },
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: "Failed to mark attendance",
      error: error.message,
    });
  }
};



// ✅ READ - Get all attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const attendances = await prisma.attendance.findMany({
      include: {
        student: {
          select: {
            id: true,
            user: { select: { username: true } },
          },
        },
        course: {
          select: { id: true, name: true },
        },
      },
    });
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch attendance records",
      error: error.message,
    });
  }
};



// ✅ READ - Get attendance by ID
export const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance = await prisma.attendance.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            id: true,
            user: { select: { username: true } },
          },
        },
        course: {
          select: { id: true, name: true },
        },
      },
    });

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};



// ✅ UPDATE attendance (change status or date)
export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, date } = req.body;

    const updated = await prisma.attendance.update({
      where: { id },
      data: {
        status,
        date: date ? new Date(date) : undefined,
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update attendance",
      error: error.message,
    });
  }
};



// ✅ DELETE attendance record
export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.attendance.delete({ where: { id } });

    res.status(200).json({ message: "Attendance deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete attendance",
      error: error.message,
    });
  }
};
