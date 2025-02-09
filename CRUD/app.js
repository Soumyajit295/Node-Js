require('dotenv').config()
const express = require('express')
const connectToDataBase = require('./Db/db.js')
const userRouter = require('./Routes/userRoutes.js')
const requestLogger = require('./Middlewares/reqLog.js')


const app = express()
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(requestLogger)
app.use('/api/users',userRouter)

connectToDataBase()

module.exports = app