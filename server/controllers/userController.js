import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { id, username, password, role, name} = req.body;

    // Validation based on your actual schema
    if (!id || !username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await prisma.user.create({
      data: { id, username, password, role, name},
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("❌ Error creating user:", error);
    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
};
