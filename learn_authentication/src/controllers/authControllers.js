const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, email , password, role } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Username already taken",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword, role });

    return res.status(201).json({
      success: true,
      message: "User signed up successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to signup the user: ${err.message}`,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Wrong Password",
      });
    }

    const jwtToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    res.cookie("authCookie", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      token: jwtToken,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to login: ${err.message}`,
    });
  }
};

const logout = (req, res) => {
    res.clearCookie("authCookie", {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });

    return res.status(200).json({
        success: true,
        message: "User logged out successfully!"
    });
};


module.exports = { signup, login, logout };
