require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'please provide comapny name'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'please provide comapny name'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    jobtype : {
        type : String,
        enum :['public','private'],
        default : 'private'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide user']
    }
} ,{
    timestamps:true
})

module.exports = mongoose.model('Job',jobSchema)