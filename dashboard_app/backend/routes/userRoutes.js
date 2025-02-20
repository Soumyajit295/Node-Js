const express = require('express')
const { isLoggedIn } = require('../middlewares/authMiddleware')
const { editName, changePassword, changeAvatar, deleteAccount } = require('../controllers/userControllers')
const upload = require('../middlewares/multerMiddleware')

const userRouter = express.Router()

userRouter.patch('/editname/:userId',isLoggedIn,editName)
userRouter.patch('/changepassword',isLoggedIn,changePassword)
userRouter.patch('/updateavatar',isLoggedIn,upload.single('avatar'),changeAvatar)
userRouter.delete('/deleteaccount/:userId',isLoggedIn,deleteAccount)

module.exports = userRouter