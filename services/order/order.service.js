const DaosFactory = require('../../models/daos/factory.daos')
const CustomError = require('../../utils/errors/customError')
const STATUS = require('../../utils/constants/httpStatus.constant')

const OrderDao = DaosFactory.getDaos('order').OrderDao
const ProductDao = DaosFactory.getDaos('product').ProductDao
const CartDao = DaosFactory.getDaos('cart').CartDao

/**
 * Product information available at order's document
 *
 * @typedef {Object} Product
 * @property {string} _id - Product's id
 * @property {string} description - Product's description
 * @property {string} name - Product's name
 * @property {string} photo - Product's photo
 * @property {string} price - Product's price
 * @property {string} quantity - Product's quantity
 */
/**
 * Creates an order from a cart's id
 *
 * @param {string} cartId
 * @return {{
 *    _id: string
 *    checkoutAddress: string
 *    products: Product[]
 *    time: Date
 *    user: string
 *    }} order created at database
 */
const createOrderService = async (cartId) => {
  try {
    if (cartId === undefined || typeof cartId !== 'string')
      throw new CustomError(STATUS.BAD_REQUEST,
        'Missing or invalid: cartId', '')
    const cart = await CartDao.getById(cartId)
    const products = await Promise.all(
      cart.products.map(async cartProduct => {
        const product = await ProductDao.getById(cartProduct._id)
        return {
          _id: cartProduct._id,
          description: product.description,
          name: product.name,
          photo: product.photo,
          price: product.price,
          quantity: cartProduct.quantity
        }
      })
    )
    const lastOrderNumber = await OrderDao.getLastOrderNumber()
    const order = {
      cartId,
      checkoutAddress: cart.checkoutAddress,
      orderNumber: lastOrderNumber + 1,
      products,
      user: cart.user
    }
    console.info(order)
    const data = await OrderDao.create(order)
    return {
      _id: data._id,
      checkoutAddress: data.checkoutAddress,
      orderNumber: data.orderNumber,
      products: data.products,
      time: data.createdAt,
      user: data.user
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
 * Deletes an order by its id
 *
 * @param {string} id
 * @return {object} { deleted: true }  if register was successful
 */
const deleteOrderService = async (id) => {
  try {
    await OrderDao.deleteById(id)
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
const finishOrderService = async (id) => {
  try {
    const data = await OrderDao.updateById(id, { status: 'Delivered' })
    return {
      _id: data._id,
      checkoutAddress: data.checkoutAddress,
      products: data.products,
      status: data.status,
      time: data.createdAt,
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
 * Gets all orders from database.
 *
 * @return {{ orders: Array }} array of carts
 */
const getAllOrderService = async () => {
  try {
    const data = await OrderDao.getAll()
    return { orders: data }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to get all carts',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}
/**
 * Gets an order from database by its id.
 *
 * @param {string} id
 * @return {{
 *    _id: data._id,
 *    checkoutAddress: data.checkoutAddress,
 *    products: data.products,
 *    user: data.user
 *   }}
 */
const getOrderService = async (id) => {
  try {
    const data = await OrderDao.getById(id)
    return {
      _id: data._id,
      checkoutAddress: data.checkoutAddress,
      products: data.products,
      status: data.status,
      time: data.createdAt,
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
module.exports = {
  createOrderService,
  deleteOrderService,
  finishOrderService,
  getAllOrderService,
  getOrderService
}
