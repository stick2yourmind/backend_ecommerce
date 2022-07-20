const { Schema } = require('mongoose')
const MongoContainer = require('../../containers/mongo.container')

const CartSchema = new Schema({
  checkoutAddress: { required: true, type: String },
  products: [
    {
      productId: { ref: 'products', type: Schema.Types.ObjectId },
      quantity: { required: true, type: Number }
    }],
  user: { ref: 'users', required: true, type: Schema.Types.ObjectId }
}, { timestamps: true })

class MongoCartDao extends MongoContainer {
  constructor () {
    super('carts', CartSchema)
  }
}

module.exports = MongoCartDao
