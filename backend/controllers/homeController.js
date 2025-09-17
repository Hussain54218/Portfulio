// controllers/homeController.js
import Home from "../models/Home.js";

export const getHomeData = async (req, res) => {
  try {
    const home = await Home.findOne();
    res.json(home || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const saveHomeData = async (req, res) => {
  try {
    const { title, subtitle, description, skills } = req.body;
    const skillsArray = skills ? skills.split(",").map((s) => s.trim()) : [];

    let home = await Home.findOne();
    const imagePath = req.file ? `/uploads/${req.file.filename}` : home?.image;

    if (home) {
      // آپدیت
      home.title = title;
      home.subtitle = subtitle;
      home.description = description;
      home.skills = skillsArray;
      home.image = imagePath;
      await home.save();
    } else {
      // ذخیره جدید
      home = new Home({
        title,
        subtitle,
        description,
        skills: skillsArray,
        image: imagePath,
      });
      await home.save();
    }

    res.json({ message: "Home data saved successfully ✅", home });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
