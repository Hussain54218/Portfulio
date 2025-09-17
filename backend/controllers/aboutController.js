import About from "../models/About.js";

// دریافت آخرین اطلاعات About
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne().sort({ createdAt: -1 });
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ایجاد اطلاعات جدید
export const createAbout = async (req, res) => {
  try {
    if (!req.body.experiences) req.body.experiences = [];
    const newAbout = new About(req.body);
    const saved = await newAbout.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// آپدیت اطلاعات
export const updateAbout = async (req, res) => {
  try {
    const updated = await About.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          intro: req.body.intro,
          details: req.body.details,
          frontendSkills: req.body.frontendSkills || [],
          backendSkills: req.body.backendSkills || [],
          experiences: req.body.experiences || [],
          contact: req.body.contact || {},
        },
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
