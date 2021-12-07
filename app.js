require('dotenv').config()
const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const app = express()

const  swaggerDocument  = require('./swagger/swaggerDocument')
const jobRoute = require('./routes/job')
const userRoute = require('./routes/user')
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authorization')
const publicjobs = require('./routes/publicjobs')

app.use(express.json())

app.use(cors())
app.use('/api/v1', publicjobs)
app.use('/api/v1/job', authenticateUser, jobRoute)
app.use('/api/v1/user', userRoute)
app.use('/api-docs' ,swaggerUi.serve , swaggerUi.setup(swaggerDocument))


app.get('/', (req,res) =>{
    res.send('Welcome')
})
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(process.env.PORT, (req, res) => {
            console.log('server stared')
        })
    } catch (error) {
        console.log(error)
    }

}

start()