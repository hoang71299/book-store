const express = require('express')
const router = express.Router()
const { asyncHandler } = require('../auth/checkAuth')
const { authUser, authAdmin } = require('../middleware/authUser')
const PaymentController = require('../controllers/payment.controller')

router.post('/create', authUser, asyncHandler(PaymentController.createPayment))
module.exports = router
