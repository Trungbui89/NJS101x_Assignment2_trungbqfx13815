const express = require('express')
const { registerVaccineList } = require('../Controllers/VaccineController')

const router = express.Router()

router.post('/vaccine_register', registerVaccineList)

module.exports = router