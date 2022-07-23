const { CartSchema } = require('../../../utils/validators/cart.utils')
const MongoContainer = require('../../containers/mongo.container')
const mongoose = require('mongoose')

class MongoCartDao extends MongoContainer {
  constructor () {
    super('carts', CartSchema)
  }

  /**
 * Adds a product to an array
 *
 * @param {string} cartId
 * @param {object} product - product object to be added
 * @param {string} arr - array's name which an product will be added
 * @return {Object} updatedCart - Cart with product added
 * @memberof MongoCartDao
 */
  async addProductToCart (cartId, product, arr = 'products') {
    if (!mongoose.isValidObjectId(cartId))
      throw new Error(`-MongoDB- ${cartId} is not a valid ObjectId`)
    const updatedCart = await this.Model.updateOne({ _id: cartId },
      { $push: { [arr]: { productId: product._id, quantity: product.quantity } } })
    if (!updatedCart.matchedCount)
      throw new Error(`-MongoDB- Document with id: ${cartId} could not been found!`)
    return updatedCart
  }
}

module.exports = MongoCartDao
