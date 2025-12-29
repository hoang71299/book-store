const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cors = require('cors')

const cookieParser = require('cookie-parser')
const connectDB = require('./config/connectDB')
const routes = require('./routes/index.routes')

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
connectDB()
app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Hello l2 team'
  })
})

routes(app)

app.use((err, req, res, next) => {
  const statuscode = err.statusCode || 500
  return res.status(statuscode).json({
    success: false,
    message: err.message || 'lỗi server'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
