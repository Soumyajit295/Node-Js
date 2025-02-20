const express = require('express')
const { isLoggedIn } = require('../middlewares/authMiddleware')
const { editName, changePassword, changeAvatar, deleteAccount, forgetPassword, resetpassword, sendOTP, getProfile } = require('../controllers/userControllers')
const upload = require('../middlewares/multerMiddleware')

const userRouter = express.Router()

userRouter.patch('/editname/:userId',isLoggedIn,editName)
userRouter.patch('/changepassword',isLoggedIn,changePassword)
userRouter.patch('/updateavatar',isLoggedIn,upload.single('avatar'),changeAvatar)
userRouter.delete('/deleteaccount/:userId',isLoggedIn,deleteAccount)
userRouter.post('/forgetpassword',forgetPassword)
userRouter.post('/resetpassword/:_id/:jwtToken',resetpassword)
userRouter.post('/sendotp',isLoggedIn,sendOTP)
userRouter.post('/deleteaccount/:userId',isLoggedIn,deleteAccount)
userRouter.get('/getprofile',isLoggedIn,getProfile)

module.exports = userRouter