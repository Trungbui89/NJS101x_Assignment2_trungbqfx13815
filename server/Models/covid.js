const mongoose = require('mongoose')

const Schema = mongoose.Schema

const covidSchema = new Schema ({
    date: {
        type: Date,
        require: true
    },
    temperature: {
        type: Number,
        require: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        require: true
    }
})

module.exports = mongoose.model('Covid', covidSchema)