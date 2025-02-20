const express = require('express')
const { signup, login, logout } = require('../controllers/authControllers')
const upload = require('../middlewares/multerMiddleware')

const authRouter = express.Router()

authRouter.post('/signup',upload.single('avatar'),signup)
authRouter.post('/login',login)
authRouter.get('/logout',logout)

module.exports = authRouter