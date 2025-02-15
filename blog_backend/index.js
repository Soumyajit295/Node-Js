require('dotenv').config()
const express = require('express')
const userRouter = require('./src/routes/userRoute')
const blogRouter = require('./src/routes/blogRoute')
const commentRouter = require('./src/routes/commentRoute')
const likeRouter = require('./src/routes/likeRoute')
const databaseConnect = require('./src/database/database')

const app = express()

databaseConnect()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended : false}))

// Routes
app.use('/api/users',userRouter)
app.use('/api/blogs',blogRouter)
app.use('/api/comments',commentRouter)
app.use('/api/likes',likeRouter)


const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
})