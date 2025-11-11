import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Common uploads directory
const uploadDir = path.resolve("uploads");

// Ensure /uploads exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // All uploads go inside /uploads
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    // Make filenames unique to avoid overwriting
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// ✅ Optional: restrict to safe file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
    "text/plain",
    "application/zip",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

// ✅ Create Multer instance
const upload = multer({ storage, fileFilter });

export default upload;
