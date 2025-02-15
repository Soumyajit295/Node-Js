const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const existUsername = await User.findOne({ username });
    if (existUsername) {
      return res.status(400).json({
        success: false,
        message: "Username is already taken",
      });
    }
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (user) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to register user",
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
        message: "Email is not registered",
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Wrong password",
      });
    }
    const jwtToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        blogs: user.blogs || [],
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "4h",
      }
    );
    res.cookie("jwtToken", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    return res.status(200).json({
        success : true,
        message : "User logged in successfully"
    })
  } catch (err) {
    return res.status(500).json({
        success : false,
        message : "Failed to logged in"
    })
  }
};

const logout = async(req,res)=>{
    try{
        res.clearCookie("jwtToken", {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });
    
        return res.status(200).json({
            success: true,
            message: "User logged out successfully!"
        });
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to logout"
        })
    }
}

module.exports = { signup, login, logout };
