import mongoose from 'mongoose'

var genreSchema = new mongoose.Schema({
    genName: {
        type: String,
        required: true,
        unique: true
    }

})

module.exports = mongoose.model('Genre', genreSchema)