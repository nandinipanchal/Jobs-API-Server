require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : [true , 'Please provide a Name'],
        minlength :3,
        maxlength:20
    },
    email :{
        type :String,
        required :[true , 'Please provide a Email'],
        match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide valid email'],
        unique : true
    },
    password :{
        type: String,
        required: [true, "please provide a password"],
        minlength: 6
    }
})

userSchema.pre('save', async function(next) {
    const salt =await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)
    next()
})

userSchema.methods.createJWT = function(){
    return jwt.sign({
        userId : this._id,
        name : this.name
    },
    process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_LIFETIME,
    }
    )
}

userSchema.methods.comparePasswords = async function(candidatePass){
    return ismatch = await bcrypt.compare(candidatePass,this.password)
}

module.exports = mongoose.model('User' , userSchema)