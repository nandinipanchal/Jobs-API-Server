const express = require('express')
const router = express.Router()

const {
    register,
    login,
    SendCustomMailtoUser
} = require('../controllers/user')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/sendmailtouser').post(SendCustomMailtoUser)

module.exports = router