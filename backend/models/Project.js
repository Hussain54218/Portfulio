import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], default: [] },
    github: { type: String },
    liveDemo: { type: String },
    image: { type: String },
    rating: { type: Number, default: 0 },
    votes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
