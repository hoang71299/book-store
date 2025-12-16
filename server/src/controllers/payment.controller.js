const { NotFoundError } = require('../core/error.response')
const { Created } = require('../core/success.response')

const cartModel = require('../models/cart.model')
const paymentModel = require('../models/payment.model')
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
        finalPrice: findCartUser.totalPrice,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        email: req.body.email,
        paymentMethod: 'cod',
        couponId: findCartUser.couponId,
        status: 'pending'
      })
      await findCartUser.deleteOne()
      await cartModel.create({ userId: id, products: [] })
      return new Created({
        message: 'Tạo đơn hàng thành công',
        metadata: newPayment
      }).send(res)
    }
  }
}

module.exports = new PaymentController()
