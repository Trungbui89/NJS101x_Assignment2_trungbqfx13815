const express = require('express')
const { loginUser, registerUser, postEditUser, getUser } = require('../Controllers/AuthController.js')

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/edit_user', postEditUser)

router.post('/get_user', getUser)

module.exports = router