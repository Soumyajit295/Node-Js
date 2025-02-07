const express = require("express");
const fs = require("fs");
let data = require("./data.json");

const app = express();
app.use(express.urlencoded({ extended: false }));

// Middleware 1
app.use((req, res, next) => {
  console.log("Hello I am middleware 1");
  next()
});

// Middleware 2
app.use((req, res, next) => {
  console.log("Hello I am middleware 2");
  next()
});

// MiddleWare 3 : To Log all req
app.use((req,res,next)=>{
    const log = `${req.method} request || ${req.path} path\n`
    fs.appendFile('./reqLog.txt',log,(err,result)=>{
        if(err){
            console.log(err.message)
        }
        else{
            console.log("Log update successfully")
            next()
        }
    })
})

// Get all users
app.get("/api/users", (req, res) => {
  res.send(data);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  data.push({id : data.length+1,...body})
  fs.writeFile("./data.json", JSON.stringify(data), (err, data) => {
    if (err) {
      res.send({ err_msg: "Failed to create user" });
    } else {
      res.send({ success_msg: "User created successfully" });
    }
  });
})

app
  .route("/api/users/:id")
  .get((req, res) => {
    const { id } = req.params;
    console.log(id)
    const user = data.filter((user) => user.id == id);
    user ? res.send(user) : res.send({ message: "User not found" });
  })
  .put((req, res) => {
    const body = req.body;
    const { id } = req.params;
    data = data.map((user) => (user.id == id ? { ...user, ...body } : user));
    fs.writeFile("./data.json", JSON.stringify(data), (err, data) => {
      if (err) {
        res.send({ err_msg: "Failed to update user" });
      } else {
        res.send({ success_msg: "User updated successfully" });
      }
    });
  })
  .delete((req,res)=>{
    const { id } = req.params
    data = data.filter((user)=>user.id!=id)
    fs.writeFile('./data.json',JSON.stringify(data),(err,result)=>{
        if(err){
            res.send({err_msg : "Failed to delete user"})
        }
        else{
            res.send({success_msg : "User Deleted Successfully"})
        }
    })
  })

app.listen(4000, () => {
  console.log(`Server is listening on port 4000`);
});
