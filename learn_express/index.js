const express = require('express')

const app = express()

app.get('/',(req,res)=>{
    res.send("Hello From Home Page!")
})

app.get('/about',(req,res)=>{
    res.send("Hello From About Page!")
})

app.listen(8000,()=>{
    console.log(`Server is listening at port 8000`)
})