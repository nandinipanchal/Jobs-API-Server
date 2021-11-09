const { Router } = require('express')
const express = require('express')
const router = express.Router()

const {
    getallJobs,
    createJob,
    updateJob,
    deleteJob,
    searchjob
} = require('../controllers/job')

router.route('/').get(getallJobs).post(createJob)
router.route('/:id').patch(updateJob).delete(deleteJob)
router.route('/search/:keyword').get(searchjob)

module.exports = router