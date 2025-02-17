const Blog = require("../models/blogModel")

const addLike = async (req, res) => {
    const { blogId, userId } = req.params;
  
    try {
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).json({ success: false, message: "Blog not found" });
      }
  
      const alreadyLiked = blog.likes.some((like) => like._id.toString() === userId);
  
      const update = alreadyLiked
        ? { $pull: { likes: userId } }
        : { $addToSet: { likes: userId } };
  
      const result = await Blog.findByIdAndUpdate(blogId, update, { new: true });
  
      return res.status(200).json({
        success: true,
        message: alreadyLiked
          ? "Like removed successfully"
          : "Like added successfully",
        likesCount: result.likes.length,
      });
    } catch (err) {
      console.error(`Error in addLike: ${err.message}`);
      return res.status(500).json({
        success: false,
        message: "Failed to toggle like",
      });
    }
  };
  

module.exports = {addLike}