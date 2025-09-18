import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./configs/db.js";

import authRoutes from "./Routes/authRoutes.js";
import projectRoutes from "./Routes/projectRoutes.js";
import messageRoutes from "./Routes/messageRoutes.js";
import homeRoutes from "./Routes/homeRoutes.js"; 
import skillRoutes from "./Routes/skillRoutes.js"
import aboutRoutes from "./Routes/about.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// مسیر استاتیک برای نمایش عکس‌ها
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Routes
app.use("/api/about", aboutRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/home", homeRoutes);  
app.use("/api/skills", skillRoutes); // ✅ بخش Skills اضافه شد

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
