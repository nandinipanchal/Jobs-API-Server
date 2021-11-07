const mongoose = require('mongoose')

const connectDB = (url)=>{
    return mongoose.connect(url).then(()=> console.log('database connected')).catch((error)=> console.error(error))
}

module.exports= connectDB