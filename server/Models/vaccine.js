const mongoose = require('mongoose')

const Schema = mongoose.Schema

const vaccineSchema = new Schema ({
    injectionList: [{
        date: {
            type: Date,
            require: true
        },
        type: {
            type: String,
            require: true
        }
    }],
    userId: Schema.Types.ObjectId
})

module.exports = mongoose.model('Vaccine',  vaccineSchema)
