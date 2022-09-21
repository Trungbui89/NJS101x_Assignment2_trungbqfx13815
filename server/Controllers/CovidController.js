// const mongoose = require('mongoose')
const Covid = require('../Models/covid.js')
const User = require('../Models/user')

exports.registerCovid = (req, res, next) => {
    User.findById(req.body.userId)
        .then(userId => {
            const date = req.body.date
            const temperature = req.body.temperature
            const covid = new Covid ({
                date: date,
                temperature: temperature,
                userId: userId
            })
        
            covid
                .save()
                .then(result => {
                    res.status(200).json({ temperature: result })
                })
                .catch(err => res.status(500).json({ message: err }))
        })
        .catch(() => res.status(501).json({ message: 'User không tồn tại' }))
}