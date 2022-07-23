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
  async addProductToCart (cartId, { productId, quantity }, arr = 'products') {
    let updatedCart
    console.log('cartId')
    console.log(cartId)
    if (!mongoose.isValidObjectId(cartId))
      throw new Error(`-MongoDB- ${cartId} is not a valid ObjectId`)
    const docWithProduct = await this.Model.find({
      products: {
        $elemMatch: { _id: productId }
      }
    })
    console.log('!docWithProduct.length')
    console.log(!docWithProduct.length)
    if (!docWithProduct.length)
      updatedCart = await this.Model.updateOne({ _id: cartId },
        // eslint-disable-next-line object-shorthand
        { $push: { [arr]: { _id: productId, quantity: quantity } } })
    else {
      const products = docWithProduct[0].products
      const updatedProducts = products.map(product => {
        console.log('product._id.toHexString()')
        console.log(product._id.toHexString())
        if (product._id.toHexString() === productId) {
          product.quantity = quantity
          return product
        }
        return product
      })
      console.log('updatedProducts')
      console.log(updatedProducts)
      updatedCart = await this.Model.updateOne({ _id: cartId }, { products: updatedProducts })
    }
    console.log('updatedCart')
    console.log(updatedCart)
    if (!updatedCart.matchedCount)
      throw new Error(`-MongoDB- Document with id: ${cartId} could not been found!`)
    return updatedCart
  }
}

module.exports = MongoCartDao
