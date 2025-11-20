const { ConflictRequestError, AuthFailureError, NotFoundError } = require('../core/error.response');

const { Created, OK } = require('../core/success.response');
const userModel = require('../models/user.model');
const { createAccessToken, createRefreshToken } = require('../auth/checkAuth');
const bcrypt = require('bcrypt');
function setCookie(res, accessToken, refreshToken) {
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        sameSite: 'strict',
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: 'strict',
    });
    res.cookie('logged', 1, {
        httpOnly: false,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: 'strict',
    });
}

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

        const accessToken = createAccessToken({ id: newUser._id });
        const refreshToken = createRefreshToken({ id: newUser._id });

        setCookie(res, accessToken, refreshToken);
        new Created({
            message: 'đăng ký thành công',
            metadata: newUser,
        }).send(res);
    }

    async login(req, res) {
        const { email, password } = req.body;
        const findUser = await userModel.findOne({ email });
        if (!findUser) {
            throw new NotFoundError('tài khoản hoặc mật khẩu không chính xác');
        }

        const isMathPassword = await bcrypt.compare(password, findUser.password);
        if (!isMathPassword) {
            throw new AuthFailureError('tài khoản hoặc mật khẩu không chính xác');
        }

        const accessToken = createAccessToken({ id: findUser._id });
        const refreshToken = createRefreshToken({ id: findUser._id });

        setCookie(res, accessToken, refreshToken);
        new OK({
            message: 'Đăng nhập thành công',
            metadata: { accessToken, refreshToken },
        }).send(res);
    }

    async authUser(req, res) {
        const userId = req.user;
        const findUser = await userModel.findById(userId);
        if (!findUser) {
            throw new NotFoundError('Người dùng không tồn tại');
        }
        return new OK({
            message: 'xác thực thành công ',
            metadata: findUser,
        }).send(res);
    }
}

module.exports = new UserController();
