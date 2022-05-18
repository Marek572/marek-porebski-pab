import mongoose from 'mongoose'

var publisherSchema = new mongoose.Schema({
    pubName: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Publisher', publisherSchema)