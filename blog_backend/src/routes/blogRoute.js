const express = require('express')
const { createNewBlog, editBlog, deleteBlog, getAllBlogs, getSingleBlog } = require('../controllers/blogController')

const blogRouter = express.Router()

blogRouter.post('/create',createNewBlog)
blogRouter.put('/edit',editBlog)
blogRouter.delete('/remove',deleteBlog)
blogRouter.get('/all-blogs',getAllBlogs)
blogRouter.get('/:blogId',getSingleBlog)

module.exports = blogRouter