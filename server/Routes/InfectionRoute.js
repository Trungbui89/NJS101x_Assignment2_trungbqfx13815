const express = require('express')
const { infectionRegister } = require('../Controllers/InfectionController')

const router = express.Router()

router.post('/infection', infectionRegister)

module.exports = router