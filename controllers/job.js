require('dotenv').config()
const Job = require('../model/jobmodel')
const {
    StatusCodes
} = require('http-status-codes')
const {
    NotFound,
    BadRequest
} = require('http-errors')


const getallJobs = async (req, res) => {
    try {
        const jobs = await Job.find({
            createdBy: req.user.userId
        }).limit(process.env.LIMIT).sort('createdAt')
        res.status(StatusCodes.OK).json({
            jobs,
            count: jobs.length
        })
    } catch (error) {
        console.log(error)
    }
}

const createJob = async (req, res) => {
    try {
        req.body.createdBy = req.user.userId
        const job = await Job.create(req.body)
        res.status(StatusCodes.CREATED).json({
            job
        })
    } catch (error) {
        console.error(error)
    }
}

const updateJob = async (req, res) => {
    try {
        const {
            body: {
                company,
                position
            },
            user: {
                userId
            },
            params: {
                id: jobId
            },
        } = req

        if (company === '' || position === '') {
            res.send('Company or position must be provided')
            throw new BadRequest('Company or position must be provided')
        }
        else {
            const job = await Job.findByIdAndUpdate({
                _id: jobId,
                createdBy: userId
            },
                req.body, {
                new: true,
                runValidators: true
            })
            if (!job) {
                res.send('No job found with this user Id')
                throw new NotFound('No job found with this user Id')
            }
            res.status(StatusCodes.OK).json({
                job
            })
        }

    } catch (error) {
        console.log(error)
    }
}

const deleteJob = async (req, res) => {
    try {
        const {
            user: {
                userId
            },
            params: {
                id: jobId
            }
        } = req

        const job = await Job.findByIdAndRemove({
            _id : jobId,
            createdBy : userId
        })

        if(!job){
            res.send('No job found with this user Id')
            throw new NotFound('No job found with this user Id')
        }

        res.status(StatusCodes.OK).send('Job deleted')
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getallJobs,
    createJob,
    updateJob,
    deleteJob
}