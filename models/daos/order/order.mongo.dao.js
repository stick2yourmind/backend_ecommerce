const { Schema } = require('mongoose')
const MongoContainer = require('../../containers/mongo.container')
const CustomError = require('../../../utils/errors/customError')
const { STATUS } = require('../../../utils/constants/httpStatus.constant')

const OrderSchema = new Schema({
  orderNumber: { required: true, type: Number },
  products: [
    {
      productDescription: { required: true, type: String },
      productName: { required: true, type: String },
      productPrice: { required: true, type: Number },
      quantity: { required: true, type: Number }
    }],
  state: { default: 'generated', required: true, type: String },
  user: { ref: 'users', required: true, type: Schema.Types.ObjectId }
}, { timestamps: true })

OrderSchema.pre('save', function (next) {
  const lastDocument = this.getLast()
  this.orderNumber = lastDocument.orderNumber + 1
  next()
})
class MongoOrderDao extends MongoContainer {
  constructor () {
    super('orders', OrderSchema)
  }

  async getLast () {
    try {
      const lastDocument = await this.Model.find({}, { __v: 0 })
        .sort({ createdAt: -1 }).limit(1).lean()
      if (!Object.keys(lastDocument).length)
        lastDocument.orderNumber = 0
      return lastDocument
    } catch (error) {
      throw new CustomError(
        STATUS.SERVER_ERROR,
        'Error occurred while trying to get all documents from db',
        error
      )
    }
  }
}

module.exports = MongoOrderDao
