const express = require('express')
let users = require('./MOCK_DATA.json')
const fs = require('fs')

const app = express()
const port = 8000

app.use(express.urlencoded({extended : false}))

app.route('/api/users/')
.get((req,res)=>res.send(users))
.post((req,res)=>{
    const body = req.body
    users.push({id : users.length+1,...body})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        if(err){
            return res.send({"message" : `${err.message}`})
        }
        else{
            return res.send({"success_message" : "User created successfully!"})
        }
    })
})

app.route('/api/users/:id')
.get((req,res)=>{
    const {id} = req.params
    const user = users.filter((user)=>user.id == id)
    return res.send(user)
})
.put((req, res) => {
    const { id } = req.params;
    const body = req.body;
    users = users.map(user => user.id == id ? { ...user, ...body } : user);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error_message: "Failed to update user data" });
        }
        res.json({ success_message: "User updated successfully" });
    });
})
.delete((req,res)=>{
    const { id } = req.params
    users = users.filter((user)=>user.id!= id)
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        if(err){
            return res.send({error_message : "Failed to delete user"})
        }
        else{
            return res.send({success_message : "User Deleted successfully"})
        }
    })
})


app.listen(port,()=>{
    console.log(`Server started at port ${port}`)
})