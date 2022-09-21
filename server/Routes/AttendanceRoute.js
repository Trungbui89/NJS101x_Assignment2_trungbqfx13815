const express = require('express')
const { addAttendance, getAttendanceInfo, endAttendance, getAllAttendance } = require('../Controllers/AttendanceController.js')

const router = express.Router()

router.post('/add-attendance', addAttendance)

router.post('/get-attendance', getAttendanceInfo)

router.post('/end-attendance', endAttendance)

router.post('/get-all-attendance', getAllAttendance)

module.exports = router