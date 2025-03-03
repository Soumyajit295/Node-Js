const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String
    },
    role : {
        type : String,
        default : 'user',
        enum : ["admin","manager","user"]
    }
})

const User = mongoose.model('user',userSchema)

module.exports = User
