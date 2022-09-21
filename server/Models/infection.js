const mongoose = require('mongoose')

const Schema = mongoose.Schema

const infectionSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    date: Date
})

module.exports = mongoose.model('Infection', infectionSchema)