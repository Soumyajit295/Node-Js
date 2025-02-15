const express = require('express')

const commentRouter = express.Router()

commentRouter.post('/add')
commentRouter.get('/:blogId')
commentRouter.delete('/:commentId')

module.exports = commentRouter