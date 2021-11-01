const express = require('express')
const router = express.Router()

const getallpublicjobs = require('../controllers/publicjobs')

router.route('/').get(getallpublicjobs)

module.exports = router