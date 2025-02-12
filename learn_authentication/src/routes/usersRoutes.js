const express = require('express')
const { isloggedIn, isAuthorized } = require('../middlewares/authMiddleware')

const userRouter = express.Router()

userRouter.get('/admin',isloggedIn,isAuthorized('admin'),(req,res)=>{
    return res.send({
        success : true,
        message : "Hello admin"
    })
})
userRouter.get('/manager',isloggedIn,isAuthorized('admin','manager'),(req,res)=>{
    return res.send({
        success : true,
        message : "Hello manager"
    })
})
userRouter.get('/user',isloggedIn,(req,res)=>{
    return res.send({
        success : true,
        message : "Hello user"
    })
})

module.exports = userRouter