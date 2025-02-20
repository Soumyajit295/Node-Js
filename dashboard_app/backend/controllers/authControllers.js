const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uploadOnCloudinary = require("../utils/cloudinary")

const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
}

const signup = async(req,res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }
    if(!req.file){
        return res.status(400).json({
            success : false,
            message : "Avatar required"
        })
    }
    try{
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success : false,    
                message : "Email already registered"
            })
        }
        const localFilePath = req.file.path
        const avatar = await uploadOnCloudinary(localFilePath)
        if(!avatar){
            return res.status(400).json({
                success : false,
                message : "Failed to upload avatar"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({name,email,password : hashedPassword,avatar})
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Failed to register user"
            })
        }
        return res.status(201).json({
            success : true,
            message : "User register successfully please login!"
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to register user"
        })
    }

}
const login = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                success : false,
                message : "Email is not registered"
            })
        }
        const validatePassword = await bcrypt.compare(password,user.password)
        if(!validatePassword){
            return res.status(400).json({
                success : false,
                message : "Wrong password"
            })
        }
        const authToken = jwt.sign(
            {
                _id : user._id,
                email : user.email,
                password : user.password,
                role : user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn : '4h'
            }
        )
        const loggedInUser = await User.findOne({email : user.email}).select('-password')
        res.cookie('authToken',authToken,cookieOption)
        return res.status(200).json({
            success : true,
            message : "User logged in successfully",
            data : loggedInUser
        })
    }
    catch(err){
        console.log(`Error while login : ${err.message}`)
        return res.status(500).json({
            success : false,
            message : "Failed to login",
            data : null
        })
    }
}
const logout = async(req,res)=>{
    try{
        res.clearCookie('authToken',cookieOption)
        return res.status(200).json({
            success : true,
            message : "User loggedout successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to logout"
        })
    }
}

module.exports = {signup,login,logout}