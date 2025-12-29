const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const connectDB = require('../config/connectDB')
const routes = require('../routes/index.routes')

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173', // lát nữa sửa
    credentials: true
  })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

connectDB()

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hello l2 team'
  })
})

routes(app)

app.use((err, req, res, next) => {
  const statuscode = err.statusCode || 500
  res.status(statuscode).json({
    success: false,
    message: err.message || 'lỗi server'
  })
})

module.exports = app
