import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }, // نام آیکون از react-icons
});

export default mongoose.model("Skill", skillSchema);
