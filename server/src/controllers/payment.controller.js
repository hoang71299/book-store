const { NotFoundError, BadRequestError } = require('../core/error.response')
const { Created } = require('../core/success.response')

const cartModel = require('../models/cart.model')
const paymentModel = require('../models/payment.model')

const { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } = require('vnpay')
function generatePayID() {
  // Tạo ID thanh toán bao gồm cả giây để tránh trùng lặp
  const now = new Date()
  const timestamp = now.getTime()
  const seconds = now.getSeconds().toString().padStart(2, '0')
  const milliseconds = now.getMilliseconds().toString().padStart(3, '0')
  return `PAY${timestamp}${seconds}${milliseconds}`
}

class PaymentController {
  async createPayment(req, res) {
    const { typePayment } = req.body
    const id = req.user
    const findCartUser = await cartModel.findOne({ userId: id })
    if (!findCartUser) {
      throw new NotFoundError('giỏ hàng không tồn tại')
    }

    if (typePayment === 'cod') {
      const newPayment = await paymentModel.create({
        userId: id,
        products: findCartUser.products,
        totalPrice: findCartUser.totalPrice,
        fullName: findCartUser.fullName,
        phoneNumber: findCartUser.phoneNumber,
        address: findCartUser.address,
        email: findCartUser.email,
        finalPrice: findCartUser.finalPrice,
        couponId: findCartUser.couponId,
        paymentMethod: 'cod',
        status: 'pending'
      })

      await findCartUser.deleteOne()
      await cartModel.create({ userId: id, products: [] })
      return new Created({
        message: 'Tạo đơn hàng thành công',
        metadata: newPayment
      }).send(res)
    } else if (typePayment === 'vnpay') {
      const vnpay = new VNPay({
        tmnCode: 'Q9IKIX0C',
        secureSecret: 'LY1ANOUV4P7HW46Z0H3RRT4CF36YPDQ5',
        vnpayHost: 'https://sandbox.vnpayment.vn',
        testMode: true, // tùy chọn
        hashAlgorithm: 'SHA512', // tùy chọn
        loggerFn: ignoreLogger // tùy chọn
      })
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const vnpayResponse = vnpay.buildPaymentUrl({
        vnp_Amount: Number(findCartUser.couponId ? findCartUser.finalPrice : findCartUser.totalPrice),
        vnp_IpAddr: '127.0.0.1', //
        vnp_TxnRef: `${findCartUser.userId} ${generatePayID()}`, // Mã đơn hàng
        vnp_OrderInfo: `Thanh toan don hang ${findCartUser.userId}`,
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: `http://localhost:3000/api/payment/vnpay-callback`,
        vnp_Locale: VnpLocale.VN,
        vnp_CreateDate: dateFormat(new Date()),
        vnp_ExpireDate: dateFormat(tomorrow)
      })

      return new Created({
        message: 'Tạo đơn hàng thành công',
        metadata: vnpayResponse
      }).send(res)
    }
  }

  async vnpayCallback(req, res) {
    const { vnp_ResponseCode, vnp_OrderInfo, vnp_TxnRef } = req.query

    if (vnp_ResponseCode !== '00') {
      throw new BadRequestError('Thanh toán thất bại')
    }

    const userId = vnp_TxnRef.split(' ')[0]
    const findCartUser = await cartModel.findOne({ userId })
    if (!findCartUser) {
      throw new NotFoundError('Giỏ hàng không tồn tại')
    }
    const newPayment = await paymentModel.create({
      userId,
      products: findCartUser.products,
      totalPrice: findCartUser.totalPrice,
      fullName: findCartUser.fullName,
      phoneNumber: findCartUser.phoneNumber,
      address: findCartUser.address,
      email: findCartUser.email,
      finalPrice: findCartUser.finalPrice,
      couponId: findCartUser.couponId,
      paymentMethod: 'vnpay',
      status: 'pending'
    })

    await findCartUser.deleteOne()
    await cartModel.create({
      userId,
      products: []
    })
    await findCartUser.deleteOne()
    await cartModel.create({ userId, products: [] })
    return new Created({
      message: 'Tạo đơn hàng thành công',
      metadata: newPayment
    }).send(res)
  }
}

module.exports = new PaymentController()
