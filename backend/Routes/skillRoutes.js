import express from "express";
import { getSkills, addSkill, downloadCV, uploadCV } from "../controllers/skillController.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer برای آپلود فایل
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, "cv.pdf") // همیشه cv.pdf ذخیره شود
});
const upload = multer({ storage });

// مسیرهای API
router.get("/", getSkills);                     // گرفتن تمام مهارت‌ها
router.post("/", addSkill);                     // اضافه کردن مهارت جدید
router.get("/download-cv", downloadCV);        // دانلود CV
router.post("/upload-cv", upload.single("cv"), uploadCV); // آپلود CV (Admin)

export default router;

