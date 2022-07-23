const { Schema } = require('mongoose')
const CartSchema = new Schema({
  checkoutAddress: { type: String },
  products: [{
    productId: { ref: 'products', type: Schema.Types.ObjectId },
    quantity: { type: Number }
  }],
  user: { ref: 'users', required: true, type: Schema.Types.ObjectId }
}, { timestamps: true })

module.exports = { CartSchema }
