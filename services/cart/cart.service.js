const DaosFactory = require('../../models/daos/factory.daos')
const CustomError = require('../../utils/errors/customError')
const STATUS = require('../../utils/constants/httpStatus.constant')
const {
  isCreateCartValid, isAddProductToCartValid,
  isUpdateShippingCartValid
} = require('../../utils/validators/cart.utils')

const CartDao = DaosFactory.getDaos('cart').CartDao
const ProductDao = DaosFactory.getDaos('product').ProductDao
const UserDao = DaosFactory.getDaos('user').UserDao

/**
 * Creates a cart.
 *
 * @param {object} { category: string, description:string, name, photo, price, stock }
 * @return {object} {created: true} if creation was successful
 */
const createCartService = async ({ userId, checkoutAddress }) => {
  try {
    if (!isCreateCartValid({ checkoutAddress, userId }))
      throw new CustomError(STATUS.BAD_REQUEST,
        'Missing or invalid: checkoutAddress or userId', '')
    await UserDao.getById(userId)
    const data = await CartDao.create({ checkoutAddress, products: [], user: userId })
    return {
      _id: data._id
    }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to create a cart',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}
/**
 * Gets all carts from database.
 *
 * @return {{ carts: Array }} array of carts
 */
const getAllCartService = async () => {
  try {
    const data = await CartDao.getAll()
    return { carts: data }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to get all carts',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}
/**
 * Gets a cart from database by its id.
 *
 * @param {string} id
 * @return {{
 *    _id: data._id,
 *    checkoutAddress: data.checkoutAddress,
 *    products: data.products,
 *    user: data.user
 *   }}
 */
const getCartService = async (id) => {
  try {
    const data = await CartDao.getById(id)
    return {
      _id: data._id,
      checkoutAddress: data.checkoutAddress,
      pickUp: data.pickUp,
      products: data.products,
      user: data.user
    }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to get a cart',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}
/**
 * Deletes a cart by its id
 *
 * @param {string} id
 * @return {object} { deleted: true }  if register was successful
 */
const deleteCartService = async (id) => {
  try {
    await CartDao.deleteById(id)
    return { deleted: true }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to delete a cart',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}
/**
 * Add a product to a cart
 *
 * @param {string} id
 * @param {Object} { itemId, quantity }
 * @return {{
 *     _id: string,
 *    checkoutAddress: string,
 *    products: object[],
 *    user: string
 *  }}
 */
const addProductToCartService = async (id, { productId, quantity }) => {
  try {
    if (!isAddProductToCartValid({ productId, quantity }))
      throw new CustomError(STATUS.BAD_REQUEST,
        'Missing or invalid: productId or quantity', '')
    await ProductDao.getById(productId)
    const data = await CartDao.addProductToCart(id, { productId, quantity })
    return {
      _id: data._id,
      checkoutAddress: data.checkoutAddress,
      products: data.products,
      user: data.user
    }

    // for await (const product of products) {
    //   if (!isAddProductToCartValid({ productId: product.productId, quantity: product.quantity }))
    //     throw new CustomError(STATUS.BAD_REQUEST,
    //       'Missing or invalid: productId or quantity', '')
    //   await ProductDao.getById(product.productId)
    //   data = await CartDao.addProductToCart(id,
    //     { productId: product.productId, quantity: product.quantity })
    // }

    // return {
    //   _id: data._id,
    //   checkoutAddress: data.checkoutAddress,
    //   products: data.products,
    //   user: data.user
    // }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to update a cart',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}

/**
 * Add all products to a cart, creates a cart if not exists
 *
 * @param {string} id
 * @param {Array} [{ itemId, quantity }]
 * @return {{
 *     _id: string,
 *    checkoutAddress: string,
 *    products: object[],
 *    user: string
 *  }}
 */
const addAllProductsToCartService = async (products, userId) => {
  try {
    if (Array.isArray(products) && !products.length)
      throw new CustomError(STATUS.BAD_REQUEST,
        'Missing or invalid: products', '')
    const user = await UserDao.getById(userId)
    const data = await CartDao.create({ checkoutAddress: user.address, products, user: userId })
    return {
      _id: data._id,
      checkoutAddress: data.checkoutAddress,
      products: data.products,
      user: data.user
    }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to update a cart',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}

/**
 * Updates shipping info from a cart
 *
 * @param {string} id
 * @param {Object} { itemId, quantity }
 * @return {{
 *     _id: string,
 *    checkoutAddress: string,
 *    products: object[],
 *    user: string
 *  }}
 */
const updateShippingCartService = async (id, { checkoutAddress, userId, pickUp }) => {
  try {
    if (!isUpdateShippingCartValid({ checkoutAddress, pickUp, userId }))
      throw new CustomError(STATUS.BAD_REQUEST,
        'Missing or invalid: userId. Or Missing or invalid: ' +
        'checkoutAddress and pickUp combination', '')
    await CartDao.updateById(id, { checkoutAddress, pickUp, user: userId })
    const data = await CartDao.getById(id)
    console.log('🚀 ~ file: cart.service.js ~ line 203 ~ updateShippingCartService ~ data', data)
    return {
      _id: data._id,
      checkoutAddress: data.checkoutAddress,
      pickUp: data.pickUp,
      products: data.products,
      user: data.user
    }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to update a cart',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}

module.exports = {
  addAllProductsToCartService,
  addProductToCartService,
  createCartService,
  deleteCartService,
  getAllCartService,
  getCartService,
  updateShippingCartService
}
