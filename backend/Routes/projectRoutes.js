import express from "express";
import multer from "multer";
import path from "path";
import { getProjects, createProject, rateProject, deleteProject } from "../controllers/projectController.js";

const router = express.Router();

// تنظیم multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get("/", getProjects);
router.post("/", upload.single("image"), createProject);
router.post("/rate/:id", rateProject);
router.delete("/:id", deleteProject);

export default router;
