const moogoose = require('mongoose');
const Schema = moogoose.Schema;

const userModel = new Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
    },

    {
        timestamps: true,
    },
);

module.exports = moogoose.model('User', userModel);
