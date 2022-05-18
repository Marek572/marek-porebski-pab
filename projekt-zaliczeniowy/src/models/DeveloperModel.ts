import mongoose from 'mongoose'

var developerSchema = new mongoose.Schema({
    devName: {
        type: String,
        required: true,
        unique: true
    },
    founder: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('Developer', developerSchema)