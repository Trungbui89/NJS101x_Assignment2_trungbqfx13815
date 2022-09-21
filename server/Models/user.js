const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema ({
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    dob: Date,
    salaryScale: Number,
    startDate: Date,
    annualLeave: Number,
    profilePicture: String,
    coverPicture: String,
    attendanceId: String,
    annualLeaveList: [{
        reason: String,
        annualLeaveDateList: [{
            annualDate: Date,
            annualTime: Number
        }]
    }]
})

module.exports = mongoose.model("User", userSchema)
