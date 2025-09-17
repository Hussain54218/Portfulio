import Skill from "../models/Skill.js";
import path from "path";
import fs from "fs";

// گرفتن تمام مهارت‌ها
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// اضافه کردن مهارت جدید
export const addSkill = async (req, res) => {
  try {
    const skill = new Skill(req.body);
    const savedSkill = await skill.save();
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// دانلود CV
export const downloadCV = (req, res) => {
  const filePath = path.join(process.cwd(), "uploads", "cv.pdf");

  // بررسی وجود فایل
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("CV یافت نشد");
  }

  res.download(filePath, "Hussain_CV.pdf", (err) => {
    if (err) {
      res.status(500).send("Error downloading CV");
    }
  });
};

// آپلود CV (Admin)
export const uploadCV = (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");
  res.status(200).json({ message: "CV uploaded successfully" });
};
