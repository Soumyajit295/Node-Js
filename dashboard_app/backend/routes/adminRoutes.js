const express = require('express')
const { isLoggedIn, isAdmin } = require('../middlewares/authMiddleware')
const getAllUsers = require('../controllers/adminControllers')

const adminRouter = express.Router()

adminRouter.get('/allusers',isLoggedIn,isAdmin('admin'),getAllUsers)

module.exports = adminRouter