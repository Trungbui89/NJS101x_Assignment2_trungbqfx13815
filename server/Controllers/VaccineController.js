const Vaccine = require('../Models/vaccine')
const User = require('../Models/user')
const mongoose = require('mongoose')

exports.registerVaccineList = (req, res, next) => {
    User
        .findById(req.body.userId)
        .then(user => {
            if(user) {
                const injectionList = req.body.injectionList
                const userId = user._id
                const vaccine = new Vaccine ({
                    injectionList: injectionList,
                    userId: mongoose.Types.ObjectId(userId)
                })
            
                vaccine
                    .save()
                    .then(vaccine => {
                        res.status(200).json({vaccine: vaccine})
                    })
                    .catch(err => res.status(500).json({ message: err }))
            } else {
                res.status(500).json({ message: 'Người dùng không tồn tại' })
            }
        })
        .catch(err => res.status(500).json({ message: 'Người dùng không tồn tại' }))
}