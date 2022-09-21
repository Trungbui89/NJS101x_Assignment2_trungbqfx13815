const mongoose = require('mongoose')
const Attendance = require('../Models/attendance.js')
const User = require('../Models/user')

exports.addAttendance = (req, res, next) => {
    const workplace = req.body.workplace
    const startTime = new Date()
    const endTime = null
    const user = {
        userId: req.body._id,
        userName: req.body.name
    }
    const attendance = new Attendance({
        workplace: workplace,
        startTime: startTime,
        endTime: endTime,
        user: user
    })
    attendance
        .save()
        .then(result => {
            const attendanceId = result._id.toString()
            const userId = result.user.userId
            User.findById(userId)
            .then(user => {
                if(user) {
                    user.attendanceId = attendanceId
                }
                return user.save()
            })
            .then(userResult => {
                res.status(200).json({attendance: result})
            })
        })
        .catch(err => console.log(err))

}

exports.getAllAttendance = (req, res, next) => {
    const userId = req.body._id
    const userName = req.body.userName

    Attendance.find({'user.userId': userId})
    .then(results => {
        if(results.length > 0) {
            res.status(200).json({attendance: results})
        } else {
            res.status(404).json({message: 'user not found!'})
        }
    })
    .catch(err => res.status(500).json({message: err}))
}

exports.getAttendanceInfo = (req, res, next) => {
    const id = req.body.attendanceId

    Attendance.findOne({'_id': mongoose.Types.ObjectId(id)})
        .then(result => {
            if(result) {
                res.status(200).json({attendance: result})
            } else {
                res.status(404).json({message: 'attendance not found'})
            }
        })
        .catch(err => res.status(500).json({message: err.message}))
}

exports.endAttendance = (req, res, next) => {
    const id = req.body.attendanceId

    Attendance.findById(id)
        .then(attendance => {
            const endTime = new Date()
            attendance.endTime = endTime
            return attendance.save()
        })
        .then(attendance => {
            User.findById(attendance.user.userId)
                .then(user => {
                    if(user) {
                        user.attendanceId = null
                        return user.save()
                    } else {
                        return undefined
                    }
                })
                .then((results) => {
                    let startDate = new Date()
                    startDate.setSeconds(0)
                    startDate.setHours(0)
                    startDate.setMinutes(0)

                    let dateMidnight = new Date(startDate)
                    dateMidnight.setHours(23)
                    dateMidnight.setMinutes(59)
                    dateMidnight.setSeconds(59)

                    Attendance.find({
                        user: {userId: results._id, userName: results.name}, 
                        startTime: { $gte: startDate },
                        endTime:{ $lte: dateMidnight }
                    })
                    .then(result => {
                        res.status(200).json({attendances: result})
                    })
                    .catch(err => res.status(500).json({message: err.message}))
                })
                .catch(err => res.status(500).json({message: err.message}))
        })
        .catch(err => res.status(500).json({message: err.message}))
}