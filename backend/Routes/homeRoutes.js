// routes/homeRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import { getHomeData, saveHomeData } from "../controllers/homeController.js";

const router = express.Router();

// تنظیم محل ذخیره عکس‌ها
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// روت‌ها
router.get("/", getHomeData);
router.post("/", upload.single("image"), saveHomeData);

export default router;
