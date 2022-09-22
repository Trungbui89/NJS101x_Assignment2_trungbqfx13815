const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const { loginUser } = require('./Controllers/AuthController')

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

// Authorization
function authToken(req, res, next) {
    console.log(req.body)
    const token = req.body['Authorization']
    if(!token) res.status(401).json({ message: 'Token not found' })
    else jwt.verify(token, process.env.SECRET_TOKEN, (err, data) => {
        if(err) res.status(403).json({ message: 'Token đã hết hạn, xin hãy đăng nhập lại' })
        else next()
    })
}

// Use routes
app.post('/auth/login', loginUser)
app.use('/auth', authToken, AuthRoute)
app.use('/attendance', authToken, AttendanceRoute)
app.use('/covid', authToken, CovidRoute)
app.use('/vaccine', authToken, VaccineRoute)
app.use(authToken, InfectionRoute)
app.use(authToken, FilesRoute)