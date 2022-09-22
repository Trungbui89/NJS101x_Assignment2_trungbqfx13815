const express = require('express')
const { registerUser, postEditUser, getUser } = require('../Controllers/AuthController.js')

const router = express.Router()

router.post('/register', registerUser)

router.post('/edit_user', postEditUser)

router.post('/get_user', getUser)

module.exports = router