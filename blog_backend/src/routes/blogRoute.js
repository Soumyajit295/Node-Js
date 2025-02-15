const express = require('express')

const blogRouter = express.Router()

blogRouter.post('/create')
blogRouter.put('/edit')
blogRouter.delete('/remove')
blogRouter.get('/all-blogs')
blogRouter.get('/:blogId')

module.exports = blogRouter