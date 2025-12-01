const cloudinary = require('../config/cloudinary')
const { Created, OK } = require('../core/success.response')
const productModel = require('../models/product.model')
const fs = require('fs/promises')
class ProductController {
  async createProduct(req, res) {
    const dataImages = req.files
    const { nameProduct, priceProduct, discountProduct, stockProduct, descriptionProduct, categoryProduct, metadata } =
      req.body
    if (
      !nameProduct ||
      !priceProduct ||
      !discountProduct ||
      !stockProduct ||
      !descriptionProduct ||
      !categoryProduct ||
      !dataImages ||
      !metadata
    ) {
      throw new BadRequestError('Thiếu thông tin sản phẩm')
    }

    let imagesProduct = []
    for (const image of dataImages) {
      const { path, filename } = image
      const { url } = await cloudinary.uploader.upload(path, {
        folder: 'products',
        resource_type: 'image'
      })
      imagesProduct.push(url || filename)
      await fs.unlink(path)
    }

    const newProduct = await productModel.create({
      nameProduct,
      priceProduct,
      discountProduct,
      stockProduct,
      descriptionProduct,
      categoryProduct,
      metadata: JSON.parse(metadata),
      imagesProduct
    })

    return new Created({
      message: 'tạo sản phẩm thành công',
      metadata: newProduct
    }).send(res)
  }
  async getAllProduct(req, res) {
    const products = await productModel.find()
    return new OK({
      message: 'lấy danh sách sản phẩm thành công',
      metadata: products
    }).send(res)
  }
  async updateProduct(req, res) {
    const { id } = req.params
    const {
      nameProduct,
      priceProduct,
      discountProduct,
      stockProduct,
      descriptionProduct,
      categoryProduct,
      metadata,
      oldImagesProduct
    } = req.body
    const dataImages = req.files

    if (
      !id ||
      !nameProduct ||
      !priceProduct ||
      !discountProduct ||
      !stockProduct ||
      !descriptionProduct ||
      !categoryProduct ||
      !metadata ||
      !oldImagesProduct
    ) {
      throw new BadRequestError('Thiếu thông tin sản phẩm')
    }
    let imagesProduct = []
    if (dataImages && dataImages.length > 0) {
      for (const image of dataImages) {
        const { path, filename } = image
        const { url } = await cloudinary.uploader.upload(path, {
          folder: 'products',
          resource_type: 'image'
        })
        imagesProduct.push(url || filename)
        await fs.unlink(path)
      }
    }

    const parserOldImages = oldImagesProduct ? JSON.parse(oldImagesProduct) : []
    const finalImagesProduct = [...parserOldImages, ...imagesProduct]
    const parseMetadata = metadata ? JSON.parse(metadata) : undefined

    const updateProduct = await productModel.findByIdAndUpdate(
      id,
      {
        nameProduct,
        priceProduct,
        discountProduct,
        stockProduct,
        descriptionProduct,
        categoryProduct,
        metadata: parseMetadata,
        imagesProduct: finalImagesProduct
      },
      { new: true }
    )
    if (!updateProduct) {
      throw new NotFoundError('Sản phẩm không tồn tại')
    }
    return new OK({
      message: 'Cập nhập sản phẩm thành công',
      metadata: updateProduct
    }).send(res)
  }
  async getProductById(req, res) {
    const { id } = req.params
    const product = await productModel.findById(id)
    if (!product) {
      throw new NotFoundError('Sản phẩm không tồn tại')
    }
    return new OK({
      message: 'Lấy sản phẩm thành công',
      metadata: product
    }).send(res)
  }
}
module.exports = new ProductController()
