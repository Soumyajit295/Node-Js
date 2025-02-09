const express = require('express')
const { createUser, updateUser, deleteUser, getAllUsers, getSingleUser } = require('../Controllers/userControllers.js')
const router = express.Router()

router.get('/',getAllUsers)
router.get('/:id',getSingleUser)
router.post('/',createUser)
router.patch('/:id',updateUser)
router.delete('/:id',deleteUser)

module.exports = router