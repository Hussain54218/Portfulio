// routes/messageRoutes.js
import express from "express";
import { createMessage, getMessages, deleteMessage } from "../controllers/messageController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ارسال پیام توسط کاربر
router.post("/", createMessage);

// مدیریت پیام‌ها (فقط Admin)
router.get("/", getMessages);

// حذف پیام (فقط Admin)
router.delete("/:id",  deleteMessage);

export default router;
