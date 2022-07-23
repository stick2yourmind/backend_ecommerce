const { Schema } = require('mongoose')
const CartSchema = new Schema({
  checkoutAddress: { type: String },
  products: [{
    _id: { ref: 'products', required: true, type: Schema.Types.ObjectId },
    quantity: { required: true, type: Number }
  }],
  user: { ref: 'users', required: true, type: Schema.Types.ObjectId }
}, { timestamps: true })

const isCreateCartValid = ({ userId, checkoutAddress }) => {
  if (userId === undefined || checkoutAddress === undefined)
    return false
  const isString = typeof userId === 'string' && typeof checkoutAddress === 'string'
  if (!isString) return false
  return true
}

const isAddProductToCartValid = ({ productId, quantity }) => {
  console.log('{ itemId, quantity }')
  console.log({ productId, quantity })
  if (productId === undefined || quantity === undefined)
    return false
  const isTypeOk = typeof productId === 'string' && typeof +quantity === 'number'
  console.log('isTypeOk')
  console.log(isTypeOk)
  if (!isTypeOk) return false
  return true
}

module.exports = { CartSchema, isAddProductToCartValid, isCreateCartValid }
