const express = require('express')
const { createNewBlog, editBlog, deleteBlog, getAllBlogs, getSingleBlog } = require('../controllers/blogController')
const isLoggedIn = require('../middlewares/authMiddleware')
const upload = require('../middlewares/multerMiddleware')

const blogRouter = express.Router()

blogRouter.post('/create/:userId',isLoggedIn,upload.single('thumbnail'),createNewBlog)
blogRouter.put('/edit',editBlog)
blogRouter.delete('/remove',deleteBlog)
blogRouter.get('/all-blogs',getAllBlogs)
blogRouter.get('/:blogId',getSingleBlog)

module.exports = blogRouter