const Blog = require("../models/blogModel")
const User = require("../models/userModel")
const uploadOnCloudinary = require("../utils/cloudinary")

const createNewBlog = async(req,res)=>{
    const {title,content} = req.body
    console.log(req.file)
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

const editBlog = async(req,res)=>{}

const deleteBlog = async(req,res)=>{}

const getSingleBlog = async(req,res)=>{}

const getAllBlogs = async(req,res)=>{}

module.exports = {createNewBlog,editBlog,deleteBlog,getSingleBlog,getAllBlogs}