const express = require('express')
const { addComment, deleteComment } = require('../controllers/commentController')
const isLoggedIn = require('../middlewares/authMiddleware')

const commentRouter = express.Router()

commentRouter.post('/add/:blogId/:userId',isLoggedIn,addComment)
commentRouter.delete('/removecomment/:commentId',isLoggedIn,deleteComment)

module.exports = commentRouter