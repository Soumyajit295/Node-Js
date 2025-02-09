const User = require("../Models/userModel.js");

const createUser = async (req, res) => {
    const { name, email, bio } = req.body;

    console.log("Name : ",name)
    console.log("Email : ",email)
    console.log("Bio : ",bio)

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "All fields are necessary!",
        });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "Email is already used!",
        });
    }

    const newUser = await User.create({ name, email, bio });
    if (!newUser) {
        return res.status(500).json({
            success: false,
            message: "Unable to create new user!",
        });
    }

    return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,
    });
};

const updateUser = async (req, res) => {
    const { name, email, bio } = req.body;
    const { id } = req.params;

    if (!name && !email && !bio) {
        return res.status(400).json({
            success: false,
            message: "At least one field is necessary",
        });
    }

    let updatedUser = {}
    
    if(name) updatedUser.name = name
    if(email) updatedUser.email = email
    if(bio) updatedUser.bio = bio

    const result = await User.findByIdAndUpdate(
        id,
        {$set : updatedUser},
        { new: true }
    );

    if (!result) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    return res.status(200).json({
        success: true,
        message: "User updated successfully!",
        data: result,
    });
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    const result = await User.findByIdAndDelete(id);

    if (!result) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    return res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
};

const getAllUsers = async (req, res) => {
    const users = await User.find();

    if (!users || users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No users found",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users,
    });
};

const getSingleUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user,
    });
};

module.exports = { createUser, updateUser, deleteUser, getAllUsers, getSingleUser };
