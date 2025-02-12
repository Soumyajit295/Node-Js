require('dotenv').config()
const express = require('express')
const cookieParser = require("cookie-parser")
const connectToDatabase = require('./src/config/db')
const authRouter = require('./src/routes/authRoutes')
const userRouter = require('./src/routes/usersRoutes')


const app = express()

// Database connection
connectToDatabase()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())

// Routes
app.use('/api/authentication',authRouter)
app.use('/api/users',userRouter)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})