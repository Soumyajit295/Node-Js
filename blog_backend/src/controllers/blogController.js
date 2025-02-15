const { default: mongoose } = require("mongoose")
const Blog = require("../models/blogModel")
const User = require("../models/userModel")
const uploadOnCloudinary = require("../utils/cloudinary")

const createNewBlog = async(req,res)=>{
    const {title,content} = req.body
    let thumbnail = req.file.path
    const {userId} = req.params
    if(!userId){
        return res.status(400).json({
            success : false,
            message : "Author details required"
        })
    }
    if(!title || !content || !thumbnail){
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    } 
    try{
        thumbnail = await uploadOnCloudinary(thumbnail)
        if(!thumbnail){
            return res.status(400).json({
                success : false,
                message : "Failed to upload the thumbnail"
            })
        }
        const blog = await Blog.create({title,content,thumbnail,author : userId})
        if(blog){
            await User.findByIdAndUpdate(userId,{$push : {blogs : blog._id}})
            const populatedBlog = await Blog.findById(blog._id).populate('author', 'username email')
            return res.status(201).json({
                success : true,
                message : "Blog created successfully!",
                data : populatedBlog
            })
        }
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to create the blog"
        })
    }
}

const editBlog = async(req,res)=>{
    const {title,content} = req.body
    const {blogId,userId} = req.params
    if(!title && !content && !req.file.path){
        return res.status(400).json({
            success : false,
            message : "At least one field is has to update"
        })
    }
    if(!userId){
        return res.status(400).json({
            success : false,
            message  : "Failed to get the author details"
        })
    }
    try{
        let updatedBlog = {}
        if(req.file.path){
            let thumbnail = await uploadOnCloudinary(req.file.path)
            if(thumbnail) {
                updatedBlog.thumbnail = thumbnail
            }
        }
        if(title) updatedBlog.title = title
        if(content) updatedBlog.content = content
        const newBlog = await Blog.findByIdAndUpdate(
            blogId,
            {$set : updatedBlog},
            {new : true}
        )
        return res.status(200).json({
            success : true,
            message : "Blog updated successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to update blog"
        })
    }
}

const deleteBlog = async(req,res)=>{
    const {blogId,userId} = req.params
    if(!blogId){
        return res.status(404).json({
            success : false,
            message : "Blog not found"
        })
    }
    try{
        const deletedBlog = await Blog.findByIdAndDelete(blogId)
        if(!deletedBlog){
            return res.status(404).json({
                success : false,
                message : "Blog not found"
            })
        }
        await User.findByIdAndUpdate(userId,{$pull : {blogs : blogId}})
        return res.status(200).json({
            success : false,
            message : "Blog deleted successfully"
        })
    }   
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to delete the blog"
        })
    }
}

const getSingleBlog = async(req,res)=>{
    const {blogId} = req.params
    try{
        const blog = await Blog.findById(blogId).populate('author','username email')
        console.log(blog)
        if(!blog){
            return res.status(404).json({
                success : false,
                message : "Blog not found"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Blog fetched successfully",
            data : blog
        })
    }
    catch(err){
        console.log("Error while fetching single blog : ",err.message)
        return res.status(500).json({
            success : false,
            message : "Failed to fetch the blog"
        })
    }
}

const getAllBlogs = async(req,res)=>{
    try{
        const blogs = await Blog.find({}).populate('author','username email').sort({createdAt : -1})
        if(!blogs){
            return res.status(404).json({
                success : false,
                message : "Blogs are not found"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Blogs fetched successfully",
            data : blogs
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to fetch the blogs"
        })
    }
}


module.exports = {createNewBlog,editBlog,deleteBlog,getSingleBlog,getAllBlogs}