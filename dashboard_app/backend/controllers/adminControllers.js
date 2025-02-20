const User = require("../models/userModel")

const getAllUsers = async(req,res)=>{
    try{
        const users = await User.find().select('-password')
        if(!users || users.length < 1){
            return res.status(404).json({
                success : false,
                message : "No user to show"
            })
        }
        return res.status(200).json({
            success : true,
            message : "User fetched successfully",
            data : users
        })
    }   
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to get the users"
        })
    }
}

module.exports = getAllUsers