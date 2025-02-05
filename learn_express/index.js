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

/* How we create a server traditional way */

// const http = require('http')

// const server = http.createServer((req,res)=>{
//     switch(req.url){
//         case '/':
//             res.end("Hello From Home Page")
//             break;
//         case '/about':
//             res.end("Hello From About Page")
//             break;
//         default:
//             res.end('404 Page Not Found')
//             break
//     }
// })

// server.listen(8000,()=>{
//     console.log("Server is listening at port 8000")
// })