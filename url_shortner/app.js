require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./db/db.js')
const urlRouter = require('./routes/urlRoute.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))

connectToDatabase()

app.use('/api/urls',urlRouter)

module.exports = app