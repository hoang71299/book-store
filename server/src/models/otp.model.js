const moogoose = require('mongoose');
const Schema = moogoose.Schema;

const otpModel = new Schema(
    {
        otp: { type: String, require: true },
        email: { type: String, require: true },
        expiredAt: { type: Date, default: new Date(Date.now() + 5 * 60 * 1000) }, // 10 minutes
    },
    {
        timestamps: true,
    },
);

module.exports = moogoose.model('otp', otpModel);
