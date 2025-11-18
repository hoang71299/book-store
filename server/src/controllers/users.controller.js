const { ConflictRequestError } = require('../core/error.response');

const { Created } = require('../core/success.response');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

class UserController {
    async register(req, res) {
        const { fullName, email, password } = req.body;
        const findUser = await userModel.findOne({ email });
        if (findUser) {
            throw new ConflictRequestError('email đã tồn tại');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await userModel.create({
            fullName,
            email,
            password: hashedPassword,
        });
        new Created({
            message: 'đăng ký thành công',
            metadata: newUser,
        }).send(res);
    }
}

module.exports = new UserController();
