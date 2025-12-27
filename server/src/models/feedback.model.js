const moogoose = require('mongoose')
const Schema = moogoose.Schema

const feedbackModel = new Schema(
  {
    userId: { type: moogoose.Types.ObjectId, ref: 'User' },
    productId: { type: moogoose.Types.ObjectId, ref: 'products' },
    paymentId: { type: moogoose.Types.ObjectId, ref: 'payment' },
    imagesFeedback: { type: Array, default: [] },
    content: { type: String, require: true },
    rating: { type: Number, require: true, default: 5 }
  },
  {
    timestamps: true
  }
)

module.exports = moogoose.model('Feedback', feedbackModel)
