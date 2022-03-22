const { ROLES } = require('../constant.js')
const mongoose = require('mongoose') 
const { Schema } = mongoose
const userSchema = Schema({
    username: String,
    password: String, // plain text
    name: String,
    roles: {
        type: [String],
        default: [ROLES.USER]
    }
})

module.exports = mongoose.model('User', userSchema)