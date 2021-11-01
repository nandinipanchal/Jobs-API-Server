require('dotenv').config()
const Job = require('../model/jobmodel')
const {
    StatusCodes
} = require('http-status-codes')


const getallpublicjobs = async (req,res)=>{
   try{
    const jobs = await Job.find({
        jobtype : 'public'
    }).limit(process.env.LIMIT)
    res.status(StatusCodes.OK).json({
        jobs,
        count :jobs.length
    })

   }catch(error){
       console.error(error)
   }
}

module.exports = getallpublicjobs