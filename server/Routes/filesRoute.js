const express = require('express')
const { updateImage, getImages } = require('../Controllers/filesController.js')

const router = express.Router()

router.post('/update-image', updateImage)

router.get('/get-images', getImages)

module.exports = router