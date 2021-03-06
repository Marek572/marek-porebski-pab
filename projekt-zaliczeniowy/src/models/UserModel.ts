import mongoose from 'mongoose'

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    hash: {
        type: String,
        default: 'expired'
    }
})

module.exports = mongoose.model('User', userSchema)