import mongoose from 'mongoose'

var collectionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    visible: {
        type: Boolean,
        default: false
    },
    beaten: {
        type: Array
    },
    planned: {
        type: Array
    }
})

module.exports = mongoose.model('Collection', collectionSchema)