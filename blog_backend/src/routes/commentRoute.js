const express = require('express')
const { addComment, getAllComments, deleteComment } = require('../controllers/commentController')
const isLoggedIn = require('../middlewares/authMiddleware')

const commentRouter = express.Router()

commentRouter.post('/add/:blogId/:userId',isLoggedIn,addComment)
commentRouter.delete('/removecomment/:commentId',deleteComment)

module.exports = commentRouter