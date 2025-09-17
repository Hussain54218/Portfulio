import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);  // ثبت‌نام
router.post("/login", loginUser);        // لاگین

export default router;
