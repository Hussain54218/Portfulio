// models/Home.js
import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  image: String, // مسیر عکس آپلود شده
  skills: [String],
});

export default mongoose.model("Home", homeSchema);
