const cloudinary = require('../config/cloudinary');
const fs = require('fs/promises');
const categoryModel = require('../models/category.model');
const { Created } = require('../core/success.response');
const { BadRequestError } = require('../core/error.response');
class CategoryController {
    async createCategory(req, res) {
        const { nameCategory } = req.body;
        const { path, filename } = req.file;

        if (!nameCategory || !path || !filename) {
            await fs.unlink(path);
            throw new BadRequestError('bạn thiếu thông tin danh mục');
        }
        const { url } = await cloudinary.uploader.upload(path, {
            folder: 'category',
            resource_type: 'image',
        });
        const newCategory = await categoryModel.create({
            nameCategory,
            imageCategory: url || filename,
        });
        await fs.unlink(path);
        return new Created({
            message: 'Tạo danh mục thành công',
            metadata: newCategory,
        }).send(res);
    }
}
module.exports = new CategoryController();
