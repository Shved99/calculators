const { Schema, model } = require('mongoose')

const Calculator = new Schema({
    nameCalc: {
        type: String,
        required: true
    },
    percent: {
        type: Number,
        required: true
    }
})

module.exports = model('Calculator', Calculator)