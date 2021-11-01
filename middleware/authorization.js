require('dotenv').config()
const User = require('../model/usermodel')
const jwt = require('jsonwebtoken')
const {
    Unauthorized
} = require('http-errors')

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.send('Authentication failed')
        throw new Unauthorized('Authentication failed')
    }

    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            userId: payload.userId,
            name: payload.name
        }
        next()
    } catch (error) {
        console.error(error)
    }
}
 
module.exports = auth