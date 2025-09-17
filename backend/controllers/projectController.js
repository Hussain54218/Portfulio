import Project from "../models/Project.js";

// گرفتن پروژه‌ها
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// اضافه کردن پروژه
export const createProject = async (req, res) => {
  try {
    const { title, description, technologies, github, liveDemo } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const project = new Project({
      title,
      description,
      technologies: technologies ? technologies.split(",").map(t => t.trim()) : [],
      github,
      liveDemo,
      image,
    });

    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Invalid Data", error: err.message });
  }
};

// ثبت امتیاز پروژه
export const rateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.rating = ((project.rating * project.votes) + rating) / (project.votes + 1);
    project.votes += 1;

    const saved = await project.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error rating project", error: err.message });
  }
};

// حذف پروژه
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully", deletedId: id });
  } catch (err) {
    res.status(500).json({ message: "Error deleting project", error: err.message });
  }
};
