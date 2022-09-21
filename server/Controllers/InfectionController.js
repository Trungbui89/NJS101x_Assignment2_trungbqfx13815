const Infection = require('../Models/infection')
const User = require('../Models/user')
const mongoose = require('mongoose')

exports.infectionRegister = (req, res, next) => {
    User
        .findById(req.body.userId)
        .then(result => {
            const state = req.body.state
            const date = new Date()
            const infaction = new Infection({
                userId: mongoose.Types.ObjectId(result._id),
                state: state,
                date: date
            })

            infaction
                .save()
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => res.status(500).json({ message: err }))
        })
        .catch(err => res.status(500).json({ message: err }))
}