const mongoose = require('mongoose') 
const { Schema } = mongoose
const eventSchema = Schema({
    title: String,
    content: String,
    startDate: Date,
    endDate: Date,
    class: String
},
{
    timestamps: true
})

module.exports = mongoose.model('Event', eventSchema)