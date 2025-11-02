import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 📤 Upload Material
export const uploadMaterial = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title } = req.body;

    if (!courseId || !title) {
      return res.status(400).json({ message: "Course ID and title are required." });
    }

    const material = await prisma.material.create({
      data: {
        title,
        courseId,
      },
    });

    res.json({ message: "Material uploaded successfully", data: material });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload material", error: error.message });
  }
};

// 📥 Get Materials
export const getMaterials = async (req, res) => {
  try {
    const { courseId } = req.params;

    const materials = await prisma.material.findMany({
      where: { courseId },
      orderBy: { createdAt: "desc" },
    });

    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch materials", error: error.message });
  }
};

// ❌ Delete Material
export const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.material.delete({
      where: { id },
    });

    res.json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete material", error: error.message });
  }
};
