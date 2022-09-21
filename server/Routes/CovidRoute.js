const express = require('express')
const { registerCovid } = require('../Controllers/CovidController')

const router = express.Router()

router.post('/register_temperature', registerCovid)

module.exports = router