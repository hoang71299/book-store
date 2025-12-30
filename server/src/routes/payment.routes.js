const express = require('express')
const router = express.Router()
const { asyncHandler } = require('../auth/checkAuth')
const { authUser, authAdmin } = require('../middleware/authUser')
const PaymentController = require('../controllers/payment.controller')

router.post('/create', authUser, asyncHandler(PaymentController.createPayment))
router.get('/vnpay-callback', asyncHandler(PaymentController.vnpayCallback))
router.get('/momo-callback', asyncHandler(PaymentController.momoCallback))
router.get('/order/:orderId', asyncHandler(PaymentController.getPaymentById))
router.get('/admin/list', authAdmin, asyncHandler(PaymentController.getPaymentsAdmin))
router.put('/admin/update/:orderId', authAdmin, asyncHandler(PaymentController.updatePayment))
module.exports = router
