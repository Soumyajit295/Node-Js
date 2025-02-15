const express = require('express')

const likeRouter = express.Router()

likeRouter.post('/addlike')
likeRouter.get('/:blogId')

module.exports = likeRouter