const http = require('http')
const fs = require('fs')

const myServer = http.createServer((req,res)=>{
    const log = `${Date.now()} : ${req.url} New Reqest received\n`
    fs.appendFile('log.txt',log,(err,data)=>{
        switch(req.url){
            case '/':
                res.end("Home Page")
                break;
            case '/about':
                res.end("About Page")
                break;
            case '/contact':
                res.end("Contact Page")
                break;
            default:
                res.end("404")
        }
    })
})

myServer.listen(8000,()=>{
    console.log(`Server started`)
})


