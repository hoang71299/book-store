const express = require('express')
const router = express.Router()
const { asyncHandler } = require('../auth/checkAuth')
const { authUser } = require('../middleware/authUser')
const cartController = require('../controllers/cart.controller')

router.post('/create', authUser, asyncHandler(cartController.createCart))
router.put('/update', authUser, asyncHandler(cartController.updateCart))

module.exports = router
