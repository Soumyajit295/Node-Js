require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const connectToDatabase = require('./database/database')
const authRouter = require('./routes/authRoutes')
const adminRouter = require('./routes/adminRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())

connectToDatabase()

app.use('/api/auth',authRouter)
app.use('/api/admin',adminRouter)
app.use('/api/users',userRouter)

app.get('/api/demo',(req,res)=>{
    return res.status(200).json({
        success : true,
        message : "Demo"
    })
})

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is listening on port : ${PORT}`)
})