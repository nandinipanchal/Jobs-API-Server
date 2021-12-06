require('dotenv').config()
const User = require('../model/usermodel')
const { StatusCodes
} = require('http-status-codes')
const {
    BadRequest,
    Unauthorized
} = require('http-errors')
const welcomenodemailer = require('../config/welcomenodemailer')
const adminnodemailer = require('../config/adminnodermailer')

const register = async (req, res) => {
    try {
        const user = await User.create({
            ...req.body
        })
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({
            user: {
                name: user.name
            },
            token,
            message:`${user.name} registered successfully! Please check your mail`
        })
        welcomenodemailer.sendConfirmationEmail(
            user.name,
            user.email
        )
    } catch (error) {
        console.error(error)
    }
}

const login = async (req, res) => {

    try {
        const {
            email,
            password
        } = req.body
        if (!email || !password) {
            res.send('Please provide Email and password')
            throw new BadRequest('Please provide Email and password')
        }
        else {
            const user = await User.findOne({
                email
            })

            if (!user) {
                res.send('Invalid credentials')
                throw new Unauthorized('Invalid credentials')
            }

            const IspasswordCorrect = await user.comparePasswords(password)

            if (!IspasswordCorrect) {
                res.send('Invalid credentials')
                throw new Unauthorized('Invalid credentials')
            }

            const token = user.createJWT()
            res.status(StatusCodes.OK).json({
                user: {
                    name: user.name
                },
                token
            })

        }

    } catch (error) {
        console.error(error)
    }
}

const SendCustomMailtoUser = (req,res) =>{
    try{    
        const {
            email,sub, text
        } = req.body
        adminnodemailer.sendNewsLetter(
            email,
            sub,
            text
        )
        res.send(`Successfully sent mail to ${email} `)


    }catch(error){ 
        console.error(error)
    }
}
module.exports = {
    register,
    login,
    SendCustomMailtoUser
}