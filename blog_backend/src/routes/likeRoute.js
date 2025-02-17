const express = require('express')
const { addLike } = require('../controllers/likeController')
const isLoggedIn = require('../middlewares/authMiddleware')

const likeRouter = express.Router()

likeRouter.post('/addlike/:blogId/:userId',isLoggedIn,addLike)
module.exports = likeRouter