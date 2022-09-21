const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const AuthRoute = require('./Routes/AuthRoute.js')
const FilesRoute = require('./Routes/filesRoute.js')
const AttendanceRoute = require('./Routes/AttendanceRoute.js')
const CovidRoute = require('./Routes/CovidRoute')
const VaccineRoute = require('./Routes/VaccineRoute')
const InfectionRoute = require('./Routes/InfectionRoute')

const app = express()

// Middleware
app.use(bodyParser.json({extended: false}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

dotenv.config()

// Connect to database
mongoose.connect(
    process.env.MONGO_DB,{useNewUrlParser: true, useUnifiedTopology: true}
)
.then(() => app.listen(process.env.PORT, () => console.log(`listening at ${process.env.PORT}`)))
.catch((err) => console.log(err))

// Use routes
app.use('/auth', AuthRoute)
app.use(FilesRoute)
app.use('/attendance', AttendanceRoute)
app.use('/covid', CovidRoute)
app.use('/vaccine', VaccineRoute)
app.use(InfectionRoute)