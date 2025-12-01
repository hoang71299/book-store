const cloudinary = require('../config/cloudinary');
const fs = require('fs/promises');
const categoryModel = require('../models/category.model');
const { Created, OK } = require('../core/success.response');
const { BadRequestError, NotFoundError } = require('../core/error.response');

function getPublicId(url) {
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');

    if (uploadIndex === -1) {
        throw new BadRequestError('Invalid Cloudinary URL');
    }

    const pathParts = parts.slice(uploadIndex + 1);
    const pathWithoutVersion = pathParts[0].startsWith('v') ? pathParts.slice(1) : pathParts;
    const publicIdWithExt = pathWithoutVersion.join('/');
    const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));

    return publicId;
}

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

    async getAllCategory(req, res) {
        const categories = await categoryModel.find();
        return new OK({
            message: 'lấy danh mục thành công',
            metadata: categories,
        }).send(res);
    }

    async updateCategory(req, res) {
        const { id } = req.params;
        const { nameCategory } = req.body;

        if (!nameCategory || !id) {
            throw new BadRequestError('Thiếu thông tin danh mục');
        }

        const findCategory = await categoryModel.findById(id);
        if (!findCategory) {
            throw new NotFoundError('Danh mục không tồn tại');
        }

        let imageCategory = findCategory.imageCategory;
        const oldImage = findCategory.imageCategory;

        if (req.file) {
            const { path, filename } = req.file;

            const { url } = await cloudinary.uploader.upload(path, {
                folder: 'category',
                resource_type: 'image',
            });

            imageCategory = url || filename;

            await fs.unlink(path).catch(() => {});

            if (oldImage) {
                await cloudinary.uploader.destroy(getPublicId(oldImage));
            }
        }

        const updateCategory = await categoryModel.findByIdAndUpdate(
            id,
            { nameCategory, imageCategory },
            { new: true },
        );

        return new OK({
            message: 'Cập nhập danh mục thành công',
            metadata: updateCategory,
        }).send(res);
    }
}
module.exports = new CategoryController();
