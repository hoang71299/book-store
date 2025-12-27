const express = require('express')
const router = express.Router()
const { asyncHandler } = require('../auth/checkAuth')
const { authUser, authAdmin } = require('../middleware/authUser')
const PaymentController = require('../controllers/payment.controller')

router.post('/create', authUser, asyncHandler(PaymentController.createPayment))
router.get('/vnpay-callback', asyncHandler(PaymentController.vnpayCallback))
module.exports = router
