const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =======================
// SIGNUP (CREATE USER)
// =======================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, age, gender, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
      phone
    });

    await user.save();

    res.status(201).json({
      message: "Signup successful"
    });
  } catch (error) {
    res.status(500).json({
      message: "Signup failed"
    });
  }
});


// =======================
// LOGIN (JWT AUTH)
// =======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed"
    });
  }
});


// =======================
// GET PROFILE (JWT)
// =======================
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile"
    });
  }
});


// =======================
// UPDATE PROFILE (JWT)
// =======================
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, email, age, gender, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, email, age, gender, phone },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Profile update failed"
    });
  }
});


// =======================
// CLIENT LIST (JWT)
// =======================
router.get("/clients", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch clients"
    });
  }
});

module.exports = router;
