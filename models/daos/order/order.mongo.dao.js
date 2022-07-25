const { Schema } = require('mongoose')
const MongoContainer = require('../../containers/mongo.container')
const CustomError = require('../../../utils/errors/customError')
const STATUS = require('../../../utils/constants/httpStatus.constant')

const OrderSchema = new Schema({
  cartId: { required: true, type: String, unique: true },
  checkoutAddress: { required: true, type: String },
  orderNumber: { required: true, type: Number },
  products: [
    {
      description: { required: true, type: String },
      name: { required: true, type: String },
      photo: { required: true, type: String },
      price: { required: true, type: Number },
      quantity: { required: true, type: Number }
    }],
  status: { default: 'Generated', required: true, type: String },
  user: { ref: 'users', required: true, type: Schema.Types.ObjectId }

}, { timestamps: true })

// OrderSchema.pre('save', function (next) {
//   const lastDocument = this.getLast()
//   this.orderNumber = lastDocument.orderNumber + 1
//   next()
// })
class MongoOrderDao extends MongoContainer {
  constructor () {
    super('orders', OrderSchema)
  }

  async getLastOrderNumber () {
    try {
      const lastDocument = await this.Model.find({}, { __v: 0 })
        .sort({ createdAt: -1 }).limit(1).lean()
      console.log('lastDocumentLast')
      console.log(lastDocument)
      if (Object.keys(lastDocument).length)
        return lastDocument[0].orderNumber
      return 0
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
