const express = require('express')
const { addComment, getAllComments, deleteComment } = require('../controllers/commentController')

const commentRouter = express.Router()

commentRouter.post('/add',addComment)
commentRouter.get('/:blogId',getAllComments)
commentRouter.delete('/:commentId',deleteComment)

module.exports = commentRouter