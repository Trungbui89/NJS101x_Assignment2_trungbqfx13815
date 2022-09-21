const mongoose = require('mongoose')

const Schema = mongoose.Schema

const attendanceSchema = new Schema({
    workplace: {
        type: String,
        require: true 
    },
    startTime: {
        type: Date,
        require: true
    },
    endTime: {
        type: Date,
        require: true
    },
    user: {
        userId: {
            type: Schema.Types.ObjectId,
            require: true
        },
        userName: {
            type: String,
            require: true
        }
    }
})

module.exports = mongoose.model("Attendance", attendanceSchema)