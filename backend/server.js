import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./configs/db.js";

import authRoutes from "./Routes/authRoutes.js";
import projectRoutes from "./Routes/projectRoutes.js";
import messageRoutes from "./Routes/messageRoutes.js";
import homeRoutes from "./Routes/homeRoutes.js";
import skillRoutes from "./Routes/skillRoutes.js";
import aboutRoutes from "./Routes/about.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// ----------------------------
// Middlewares
// ----------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// مسیر استاتیک برای آپلود فایل‌ها
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// ----------------------------
// API Routes
// ----------------------------
app.use("/api/about", aboutRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/skills", skillRoutes);

// ----------------------------
// Serve Frontend (React Build)
// ----------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  // مسیر واقعی پوشه build شده React
  const frontendPath = path.join(__dirname, "../frontend/dist");
  
  // فایل‌های استاتیک React
  app.use(express.static(frontendPath));

  // هر route ای که API نیست → index.html React
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ----------------------------
// Error Handling Middlewares
// ----------------------------
app.use(notFound);
app.use(errorHandler);

// ----------------------------
// Start Server
// ----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
