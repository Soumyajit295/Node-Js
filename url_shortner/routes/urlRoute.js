const express = require('express')
const { createShortId, redirectToPage, getAnalytics } = require('../controllers/urlController.js')

const urlRouter = express.Router()

urlRouter.post('/',createShortId)
urlRouter.get('/:shortId',redirectToPage)
urlRouter.get('/analytics/:shortId',getAnalytics)

module.exports = urlRouter