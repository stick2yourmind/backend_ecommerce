const DaosFactory = require('../../models/daos/factory.daos')
const CustomError = require('../../utils/errors/customError')
const STATUS = require('../../utils/constants/httpStatus.constant')

const CartDao = DaosFactory.getDaos('cart').CartDao

/**
 * Creates a cart.
 *
 * @param {object} { category: string, description:string, name, photo, price, stock }
 * @return {object} {created: true} if creation was successful
 */
const createCartService = async ({ userId, checkoutAddress }) => {
  try {
    const data = await CartDao.create({ checkoutAddress, products: [], user: userId })
    return {
      _id: data._id
    }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to create a product',
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
      'Error occurred on service while trying to get all products',
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
      products: data.products,
      user: data.user
    }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to get a product',
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
      'Error occurred on service while trying to delete a product',
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
const addProductToCartService = async (id, { itemId, quantity }) => {
  try {
    const data = await CartDao.addProductToCart(id, { itemId, quantity })
    return {
      _id: data._id,
      checkoutAddress: data.checkoutAddress,
      products: data.products,
      user: data.user
    }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to update a product',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}

module.exports = {
  addProductToCartService,
  createCartService,
  deleteCartService,
  getAllCartService,
  getCartService
}
