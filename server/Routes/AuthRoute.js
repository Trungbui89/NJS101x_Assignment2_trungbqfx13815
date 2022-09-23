const express = require('express')
// const { check } = require('express-validator/check')

const { registerUser, postEditUser, getUser } = require('../Controllers/AuthController.js')
const { checkAnnualList } = require('../helper/helperFunc')

const router = express.Router()

router.post('/register', registerUser)

router.post('/edit_user', checkAnnualList, postEditUser)

router.post('/get_user', getUser)

module.exports = router