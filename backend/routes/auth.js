import express from "express";
import { signupUser, loginUser, getMe } from "../controllers/auth.js";
import authMiddleware from "../middleware/auth.js";
import { googleLogin } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/google-login", googleLogin);
router.get("/me", authMiddleware, getMe);

export default router;