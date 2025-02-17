const Comment = require("../models/commentsModel")
const Blog = require("../models/blogModel")

const addComment = async(req,res)=>{
    const {blogId,userId} = req.params
    const {content} = req.body
    if(!content){
        return res.status(404).json({
            success : false,
            message : "Empty comment"
        })
    }
    try{
        const comment = await Comment.create({blog : blogId,author : userId,content})
        if(!comment){
            return res.status(400).json({
                success : false,
                message : "Failed to create comment"
            })
        }
        await Blog.findByIdAndUpdate(blogId,{$push : {comments : comment._id}})
        const populatedComment = await Comment.findById(comment._id).populate('author','username') 
        if(populatedComment){
            return res.status(201).json({
                success : true,
                message : "Comment added successfully"
            })
        }
    }
    catch(err){
        console.log(`Error while add comment : ${err.message}`)
        return res.status(500).json({
            success : false,
            message : "Failed to add comment"
        })
    }
}

const deleteComment = async(req,res)=>{
    const {commentId} = req.params
    try{
        const comment = await Comment.findById(commentId)
        if(!comment){
            return res.status(404).json({
                success : false,
                message : "Comment not found"
            })
        }
        const blog = comment?.blog 
        const deletedCmnt = await Comment.findByIdAndDelete(commentId)
        await Blog.findByIdAndUpdate(blog,{$pull : {comments : commentId}})
        return res.status(200).json({
            success : true,
            message : "Comment deleted successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Failed to delete comment!"
        })
    }
}

module.exports = {addComment,deleteComment}