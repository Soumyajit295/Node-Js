require('dotenv').config()
const express = require('express')

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended : false}))

// Routes


const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
})