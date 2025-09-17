// controllers/messageController.js
import Message from "../models/Message.js";

// ایجاد پیام جدید
export const createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// دریافت همه پیام‌ها
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages); // ❌ نباید دوباره داخل { data } بگذاری
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// حذف پیام
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Message.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
