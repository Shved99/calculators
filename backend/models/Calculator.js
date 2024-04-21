const { Schema, model } = require('mongoose')

const numberFields = new Schema({
    fieldName: {
        type: String,
        required: true
    },
    field: {
        type: String,
        required: true
    }
})

const Calculator = new Schema({
    nameCalc: {
        type: String,
        required: true
    },
    numberFields: {
        type: [numberFields],
        required: true
    },
    formula: {
        type: String,
        required: true
    }
})

module.exports = model('Calculator', Calculator)