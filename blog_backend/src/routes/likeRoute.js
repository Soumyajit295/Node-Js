const express = require('express')
const { addLike, getAllLike } = require('../controllers/likeController')

const likeRouter = express.Router()

likeRouter.post('/addlike',addLike)
likeRouter.get('/:blogId',getAllLike)

module.exports = likeRouter