const express = require('express')
const { createNewBlog, editBlog, deleteBlog, getAllBlogs, getSingleBlog } = require('../controllers/blogController')
const isLoggedIn = require('../middlewares/authMiddleware')
const upload = require('../middlewares/multerMiddleware')

const blogRouter = express.Router()

blogRouter.post('/create/:userId',isLoggedIn,upload.single('thumbnail'),createNewBlog)
blogRouter.put('/edit/:blogId/:userId',isLoggedIn,upload.single('thumbnail'),editBlog)
blogRouter.delete('/remove/:blogId/:userId',isLoggedIn,deleteBlog)
blogRouter.get('/getsingleblog/:blogId',isLoggedIn,getSingleBlog)
blogRouter.get('/allblogs',getAllBlogs)


module.exports = blogRouter