const { BadRequestError } = require('../core/error.response')
const { OK } = require('../core/success.response')
const cartModel = require('../models/cart.model')
const productModel = require('../models/product.model')
const couponModel = require('../models/coupon.model')
async function calculateTotalPrice(findCartUser) {
  const allProductIds = findCartUser.products.map((p) => p.productId)

  const productsData = await productModel.find({ _id: { $in: allProductIds } })

  let totalPrice = 0

  findCartUser.products.forEach((p) => {
    const product = productsData.find((prod) => prod._id.toString() === p.productId.toString())
    if (product) {
      const priceAfterDiscount = product.priceProduct - (product.priceProduct * product.discountProduct) / 100
      totalPrice += priceAfterDiscount * p.quantity
    }
  })
  findCartUser.totalPrice = totalPrice
  await findCartUser.save()
}
class CartController {
  async createCart(req, res) {
    const id = req.user
    const { productId, quantity } = req.body

    if (!id || !productId || !quantity) {
      throw new BadRequestError('Thiếu thông tin giỏ hàng')
    }
    const findProductDb = await productModel.findById(productId)
    if (!findProductDb) {
      throw new BadRequestError('Sản phẩm không tồn tại')
    }
    if (findProductDb.stockProduct < Number(quantity)) {
      throw new BadRequestError('Số lượng sản phẩm không đủ')
    }
    let findCartUser = await cartModel.findOne({ userId: id })

    if (!findCartUser) {
      findCartUser = await cartModel.create({
        userId: id,
        products: [{ productId, quantity: Number(quantity) }]
      })
      await findProductDb.updateOne({
        $inc: { stockProduct: -Number(quantity) }
      })
    } else {
      const findProduct = findCartUser.products.find((product) => product.productId.toString() === productId)

      if (findProduct) {
        findProduct.quantity += Number(quantity)
        await findProductDb.updateOne({ $inc: { stockProduct: -Number(quantity) } })
      } else {
        findCartUser.products.push({ productId, quantity })
        await findProductDb.updateOne({ $inc: { stockProduct: -Number(quantity) } })
      }
      await findCartUser.save()
    }
    await calculateTotalPrice(findCartUser)

    return new OK({
      message: 'Thêm sản phẩm vào giỏ hàng thành công',
      metadata: findCartUser
    }).send(res)
  }
  async updateCart(req, res) {
    const id = req.user
    const { productId, newQuantity } = req.body
    // Logic cập nhật giỏ hàng
    if (!id || !productId) {
      throw new BadRequestError('Thiếu thông tin giỏ hàng')
    }
    const findCartUser = await cartModel.findOne({ userId: id })
    if (!findCartUser) {
      throw new BadRequestError('Giỏ hàng không tồn tại')
    }
    const findProductInCart = findCartUser.products.find((product) => product.productId.toString() === productId)
    if (!findProductInCart) {
      throw new BadRequestError('Sản phẩm không tồn tại trong giỏ hàng')
    }
    const findProductDb = await productModel.findById(productId)
    if (!findProductDb) {
      throw new BadRequestError('Sản phẩm không tồn tại')
    }
    const currentQuantity = Number(findProductInCart.quantity)
    const quantity = Number(newQuantity)

    if (Number(newQuantity) === 0) {
      // Xóa sản phẩm khỏi giỏ hàng
      findCartUser.products = findCartUser.products.filter((product) => product.productId.toString() !== productId)
      findProductDb.stockProduct += currentQuantity
      findCartUser.finalPrice = 0
      findCartUser.couponId = null
      await findProductDb.save()
    } else if (Number(newQuantity) >= currentQuantity) {
      const addQuantity = Number(newQuantity) - currentQuantity
      if (findProductDb.stockProduct < addQuantity) {
        throw new BadRequestError('Số lượng sản phẩm không đủ')
      }
      findProductDb.stockProduct -= addQuantity
      findProductInCart.quantity = Number(newQuantity)
      await findProductDb.save()
    } else {
      const reduceQuantity = currentQuantity - Number(newQuantity)
      findProductDb.stockProduct += reduceQuantity
      findProductInCart.quantity = Number(newQuantity)
      await findProductDb.save()
    }
    await calculateTotalPrice(findCartUser)
    return new OK({
      message: 'Cập nhật giỏ hàng thành công',
      metadata: findCartUser
    }).send(res)
  }
  async deleteProductInCart(req, res) {
    const id = req.user
    const { productId } = req.params

    if (!id || !productId) {
      throw new BadRequestError('Thiếu thông tin giỏ hàng')
    }

    const findCartUser = await cartModel.findOne({ userId: id })
    if (!findCartUser) {
      throw new BadRequestError('Giỏ hàng không tồn tại')
    }

    const findProductInCart = findCartUser.products.find((product) => product.productId.toString() === productId)
    if (!findProductInCart) {
      throw new BadRequestError('Sản phẩm không tồn tại trong giỏ hàng')
    }

    const productDb = await productModel.findById(productId)
    if (!productDb) {
      throw new BadRequestError('Sản phẩm không tồn tại')
    }

    findCartUser.products = findCartUser.products.filter((product) => product.productId.toString() !== productId)
    productDb.stockProduct += findProductInCart.quantity
    await productDb.save()
    await calculateTotalPrice(findCartUser)
    return new OK({
      message: 'Xóa sản phẩm khỏi giỏ hàng thành công',
      metadata: findCartUser
    }).send(res)
  }

  async getCartInUser(req, res) {
    const id = req.user
    const findCartUser = await cartModel.findOne({ userId: id }).populate('products.productId')
    const today = new Date()
    const coupons = await couponModel.find({
      startDate: { $lte: today },
      endDate: { $gte: today },
      minPrice: { $lte: findCartUser?.totalPrice },
      quantity: { $gt: 0 }
    })
    if (!findCartUser) {
      const newCart = await cartModel.create({ userId: id, products: [] })
      return new OK({
        message: 'Lấy giỏ hàng thành công',
        metadata: { cart: newCart, coupons }
      }).send(res)
    }
    return new OK({
      message: 'Lấy giỏ hàng thành công',
      metadata: { cart: findCartUser, coupons }
    }).send(res)
  }

  async applyCoupon(req, res) {
    const id = req.user
    const { couponId } = req.body

    if (!id) {
      throw new BadRequestError('Thiếu thông tin áp dụng mã giảm giá')
    }
    const findCartUser = await cartModel.findOne({ userId: id })
    if (!findCartUser) {
      throw new BadRequestError('Giỏ hàng không tồn tại')
    }
    if (couponId == null) {
      findCartUser.couponId = null
      findCartUser.finalPrice = 0
      await findCartUser.save()
      return new OK({
        message: 'Cập nhật giỏ hàng thành công',
        metadata: findCartUser
      }).send(res)
    }
    const findCoupon = await couponModel.findById(couponId)
    if (!findCoupon) {
      throw new BadRequestError('Mã giảm giá không tồn tại')
    }

    switch (true) {
      case findCoupon.quantity <= 0:
        throw new BadRequestError('Mã giảm giá đã hết lượt sử dụng')
      case findCoupon.startDate > new Date():
        throw new BadRequestError('Mã giảm giá chưa bắt đầu')
      case findCoupon.endDate < new Date():
        throw new BadRequestError('Mã giảm giá đã kết thúc')
      case findCartUser.totalPrice < findCoupon.minPrice:
        throw new BadRequestError('Giá trị đơn hàng không đủ để áp dụng mã giảm giá')
      default:
        break
    }
    findCartUser.couponId = findCoupon._id
    findCartUser.finalPrice = findCartUser.totalPrice - (findCartUser.totalPrice * findCoupon.discount) / 100
    await findCartUser.save()
    return new OK({
      message: 'Áp dụng mã giảm giá thành công',
      metadata: findCartUser
    }).send(res)
  }
  async updateInfoCart(req, res) {
    const id = req.user
    const { fullName, phoneNumber, address, email } = req.body

    if (!id || !fullName || !phoneNumber || !address || !email) {
      throw new BadRequestError('Thiếu thông tin giỏ hàng')
    }

    const findCartUser = await cartModel.findOne({ userId: id })
    if (!findCartUser) {
      throw new NotFoundError('Giỏ hàng không tồn tại')
    }

    findCartUser.fullName = fullName
    findCartUser.phoneNumber = phoneNumber
    findCartUser.address = address
    findCartUser.email = email
    await findCartUser.save()

    return new OK({
      message: 'Cập nhật thông tin giỏ hàng thành công',
      metadata: findCartUser
    }).send(res)
  }
}

module.exports = new CartController()
