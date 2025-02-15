const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    thumbnail : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

const Blog = mongoose.model('Blog',blogSchema)

module.exports = Blog