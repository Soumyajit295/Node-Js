const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { customAlphabet } = require('nanoid')
const uploadOnCloudinary = require("../utils/cloudinary")
const sendEmail = require("../utils/sendEmail")
const otpCreater = require("../utils/otpCreater")


const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
}

const getProfile = async(req,res)=>{
    if(!req.user){
        return res.status(400).json({
            success : false,
            message : "User not authenticated"
        })
    }
    try{
        const user = await User.findById(req.user?._id).select('-password')
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }
        return res.status(200).json({
            success : true,
            message : "profile fetched successfully",
            data : user
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to get profile"
        })
    }
}
const editName = async(req,res)=>{
    const {name} = req.body
    const {userId} = req.params
    if(!name){
        return res.status(400).json({
            success : false,
            message : "Name required"
        })
    }
    try{
        const user = await User.findByIdAndUpdate(userId,{$set : {name}},{new : true}).select('-password')
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }
        return res.status(200).json({
            success : false,
            message : "username updated successfully",
            data : user
        })
    }   
    catch(err){
        console.log(`Error while edit name : ${err.message}`)
        return res.status(500).json({
            success : false,
            message : "Failed to update the name"
        })
    }
}

const changePassword = async(req,res)=>{
    const {newPassword} = req.body

    if(!req.user){
        return res.status(400).json({
            success : false,
            message : "User is not logged in"
        })
    }
    if(!newPassword){
        return res.status(400).json({
            success : false,
            message : "New password is required"
        })
    }
    try{
        const user = await User.findById(req.user._id)
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }
        const checkIsSame = await bcrypt.compare(newPassword,user.password)
    
        if(checkIsSame){
            return res.status(400).json({
                success : false,
                message : "Old and new password can't be same"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword,10)
    

        const upadateUser = await User.findByIdAndUpdate(req.user._id,{ password: hashedPassword });

        if(!upadateUser){
            return res.status(400).json({
                success : false,
                message : "User not found"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Password updated successfully"
        })
    }
    catch(err){
        console.log(`Error while change password : ${err.message}`)
        return res.status(500).json({
            success : false,
            message : "Failed to change password"
        })
    }
}

const changeAvatar = async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                success : false,
                message : "Avatar is required to update"
            })
        }
        const localFilePath = req.file.path
        const avatar = await uploadOnCloudinary(localFilePath)
        if(!avatar){
            return res.status(400).json({
                success : false,
                message : "Failed to load the avatar"
            })
        }
        const user = await User.findByIdAndUpdate(req.user._id,{avatar : avatar},{new : true}).select('-password')
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Failed to update the avatar"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Avatar updated successfully",
            data : user
        })
    }
    catch(err){
        console.log(`Error while updateing the avatar : ${err.message}`)
        return res.status(500).json({
            success : false,
            message : "Failed to update the avatar"
        })
    }
}

const sendOTP = async(req,res)=>{
    if(!req.user){
        return res.status(400).json({
            success : false,
            message : "User is not logged in"
        })
    }
    try{
        const {email} = req.user
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }
        const otp = otpCreater()
        const subject = "Account deletetion request"
        const message = `Please put the otp : ${otp}`
        const response = await sendEmail(user.email,subject,message)
        if(!response){
            return res.status(400).json({
                success : false,
                message : "Failed to send OTP"
            })
        }
        else{
            user.otp = otp
            await user.save()
            return res.status(200).json({
                success : true,
                message : "OTP sent successfully"
            })
        }
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to send OTP"
        })
    }
}

const deleteAccount = async(req,res)=>{
    const {otp} = req.body
    const {userId} = req.params

    if(!otp){
        return res.status(400).json({
            success : false,
            message : "OTP required"
        })
    }
    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }
        if(otp!=user.otp){
            return res.status(400).json({
                success : false,
                message : "Invalid OTP"
            })
        }
        await User.findByIdAndDelete(userId)
        res.clearCookie('authToken',cookieOption)
        return res.status(200).json({
            success : true,
            message : "User deleted successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to delete account"
        })
    }
}

const forgetPassword = async(req,res)=>{
    const {email} = req.body
    if(!email){
        return res.status(400).json({
            success : false,
            message : "Email required"
        })
    }
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                success : false,
                message : "Email not registered"
            })
        }
        const jwtToken = jwt.sign(
            {_id : user._id},
            process.env.JWT_SECRET,
            {expiresIn : '1h'}
        )
        const subject = `Reset password by below link - Link will expires within 1 hour`
        const message = `http://localhost:5173/resetpassword/${user._id}/${jwtToken}`
        const response = await sendEmail(email,subject,message)
        console.log(response)
        if(!response){
            return res.status(500).json({
                success : false,
                message : "Failed to send mail"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Reset password link send to your email"
        })
    }
    catch(err){
        console.log(`Error while forget password : ${err.message}`)
        return res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}

const resetpassword = async(req,res)=>{
    const {_id,jwtToken} = req.params
    const {password,confirmPassword} = req.body

    if(!password || !confirmPassword){
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }
    if(password!=confirmPassword){
        return res.status(400).json({
            success : false,
            message : "password and confirm password must be same"
        })
    }
    try{
        const verifyToken = jwt.verify(jwtToken,process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(400).json({
                success : false,
                message : "Link expired"
            })
        }
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        user.password = hashedPassword
        await user.save()
        return res.status(200).json({
            success : true,
            message : "Password reset successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to reset password"
        })
    }
}

module.exports = {getProfile,editName,changePassword,changeAvatar,sendOTP,deleteAccount,forgetPassword,resetpassword}