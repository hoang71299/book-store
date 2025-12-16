const { BadRequestError } = require('../core/error.response')
const { Created, OK } = require('../core/success.response')
const couponModel = require('../models/coupon.model')

class CouponController {
  async createCoupon(req, res) {
    const { nameCoupon, discount, quantity, startDate, endDate, minPrice } = req.body
    if (!nameCoupon || !discount || !quantity || !startDate || !endDate || !minPrice) {
      throw new BadRequestError('Thiếu trường thông tin')
    }

    const newCoupon = await couponModel.create({
      nameCoupon,
      discount,
      quantity,
      startDate,
      endDate,
      minPrice
    })
    return new Created({
      message: 'Tạo mã giảm giá thành công',
      metadata: newCoupon
    }).send(res)
  }

  async getAllCoupons(req, res) {
    const coupons = await couponModel.find()
    return res.status(200).json({
      message: 'Lấy danh sách mã giảm giá thành công',
      metadata: coupons
    })
  }

  async updateCoupon(req, res) {
    const { id } = req.params
    const { nameCoupon, discount, quantity, startDate, endDate, minPrice } = req.body
    if (!id || !nameCoupon || !discount || !quantity || !startDate || !endDate || !minPrice) {
      throw new BadRequestError('Thiếu trường thông tin')
    }

    const findCoupon = await couponModel.findById(id)
    if (!findCoupon) {
      throw new BadRequestError('Mã giảm giá không tồn tại')
    }

    findCoupon.nameCoupon = nameCoupon
    findCoupon.discount = discount
    findCoupon.quantity = quantity
    findCoupon.startDate = startDate
    findCoupon.endDate = endDate
    findCoupon.minPrice = minPrice
    await findCoupon.save()
    return new OK({
      message: 'Cập nhật mã giảm giá thành công',
      metadata: findCoupon
    }).send(res)
  }

  async deleteCoupon(req, res) {
    const { id } = req.params
    if (!id) {
      throw new BadRequestError('Thiếu trường thông tin')
    }

    const findCoupon = await couponModel.findById(id)
    if (!findCoupon) {
      throw new BadRequestError('Mã giảm giá không tồn tại')
    }
    const deleteCoupon = await couponModel.findByIdAndDelete(id)
    return new OK({
      message: 'Xóa mã giảm giá thành công',
      metadata: deleteCoupon
    }).send(res)
  }
}
module.exports = new CouponController()
