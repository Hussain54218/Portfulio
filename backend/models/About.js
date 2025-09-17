import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  period: { type: String },
  description: { type: String },
});

const AboutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    intro: { type: String, required: true },
    details: { type: String, required: true },
    frontendSkills: { type: [String], default: [] },
    backendSkills: { type: [String], default: [] },
    experiences: { type: [ExperienceSchema], default: [] },
    contact: { type: Object, default: {} }, // ایمیل، تلفن و غیره
  },
  { timestamps: true }
);

export default mongoose.model("About", AboutSchema);
