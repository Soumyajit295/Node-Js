const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const uploadOnCloudinary = require("../utils/cloudinary")

const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
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

const deleteAccount = async(req,res)=>{
    try{
        const {userId} = req.params
        if(!userId){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }
        const user = await User.findByIdAndDelete(userId)
        if(!user){
            return res.status(404).json({
                success : false,
                message : "Failed to get the user"
            })
        }
        res.clearCookie('authToken',cookieOption)
        return res.status(200).json({
            success : true,
            message : "Account deleted successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to delete the account"
        })
    }
}

module.exports = {editName,changePassword,changeAvatar,deleteAccount}