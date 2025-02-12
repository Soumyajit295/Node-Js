const express = require('express')
const { signup, login, logout } = require('../controllers/authControllers')

const authRouter = express.Router()

authRouter.post('/signup',signup)
authRouter.post('/login',login)
authRouter.get('/logout',logout)

module.exports = authRouter