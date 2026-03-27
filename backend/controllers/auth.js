import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔐 Google client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ✅ SIGNUP
export const signupUser = async (req, res) => {
  try {
    const { fullName, username, email, phone, birthday, password } = req.body;

    if (!fullName || !username || !email || !password)
      return res.status(400).json({ error: "Missing fields" });

    const existing = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existing)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      username,
      email,
      phone,
      birthday,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ user, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ LOGIN
export const loginUser = async (req, res) => {
  try {
    const { type, value, password } = req.body;

    const user = await User.findOne({ [type]: value });

    if (!user)
      return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ user, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ GET CURRENT USER
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ GOOGLE LOGIN (FIXED POSITION)
export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullName: name,
        username: email.split("@")[0],
        email,
        password: "google_auth"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ user, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Google login failed" });
  }
};