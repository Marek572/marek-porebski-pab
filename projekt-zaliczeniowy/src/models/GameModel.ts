import mongoose from 'mongoose'

var gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    genres: {
        type: Array,
        required: true
    },
    developer: {
        type: String,
        required: true
    },
    publisher: {
        type: Array,
        required: true
    },
    releseDate:{
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Game', gameSchema)