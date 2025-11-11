import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password required" });
    }

    // 🔹 Fetch the user with related teacher/student records
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        teacher: true,
        student: true,
      },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid username" });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // 🔹 Build response data
    let extraData = {};
    if (user.role === "teacher" && user.teacher) {
      extraData.teacherId = user.teacher.id;
    } else if (user.role === "student" && user.student) {
      extraData.studentId = user.student.id;
    }

    console.log("✅ User logged in:", user.username, user.role, extraData);

    console.log("🧑‍💻 User from DB:", user);
    // 🔹 Send response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
        ...extraData,
      },
    });

  } catch (error) {
    console.error("❌ Login error:", error);
    return res.status(500).json({ success: false, message: "Login failed", error: error.message });
  }
};
