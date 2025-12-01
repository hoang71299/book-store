const { AuthFailureError, ForbiddenError } = require('../core/error.response');

const { verifyToken } = require('../auth/checkAuth');
const userModel = require('../models/user.model');
const authUser = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            throw new AuthFailureError('vui lòng đăng nhập lại');
        }
        const decoded = await verifyToken(accessToken);
        if (!decoded) {
            throw new AuthFailureError('vui lòng đăng nhập lại');
        }
        req.user = decoded.id;
        next();
    } catch (error) {
        throw new AuthFailureError('vui lòng đăng nhập lại');
    }
};

const authAdmin = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            throw new AuthFailureError('vui lòng đăng nhập lại');
        }
        const decoded = await verifyToken(accessToken);
        if (!decoded) {
            throw new AuthFailureError('vui lòng đăng nhập lại ');
        }

        const findUser = await userModel.findById(decoded.id);
        if (!findUser) {
            throw new AuthFailureError('vui lòng đăng nhập lại');
        }
        if (findUser.isAdmin === false) {
            throw new ForbiddenError('bạn ko co quyền');
        }
        next();
    } catch (error) {
        throw new ForbiddenError('bạn ko co quyền');
    }
};
module.exports = { authUser, authAdmin };
