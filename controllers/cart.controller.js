const { apiSuccessResponse } = require('../utils/api.utils')
const STATUS = require('../utils/constants/httpStatus.constant')
const {
  addProductToCartService,
  createCartService,
  deleteCartService,
  getAllCartService,
  getCartService,
  addAllProductsToCartService,
  updateShippingCartService
} = require('../services/cart/cart.service')

const createCart = async (req, res, next) => {
  try {
    const { userId, checkoutAddress } = req.body
    const createMsg = await createCartService({ checkoutAddress, userId })
    const response = apiSuccessResponse(createMsg, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params
    const deleteMsg = await deleteCartService(id)
    const response = apiSuccessResponse(deleteMsg, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const getAllCart = async (req, res, next) => {
  try {
    const getAllMsg = await getAllCartService()
    const response = apiSuccessResponse(getAllMsg, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const getCart = async (req, res, next) => {
  try {
    const { id } = req.params
    const getMsg = await getCartService(id)
    const response = apiSuccessResponse(getMsg, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const addProductToCart = async (req, res, next) => {
  try {
    const { id } = req.params
    const { productId, quantity } = req.body
    const getMsg = await addProductToCartService(id, { productId, quantity }, 'products')
    const response = apiSuccessResponse(getMsg, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const updateShippingCart = async (req, res, next) => {
  try {
    const { id } = req.params
    const { checkoutAddress, pickUp } = req.body
    const userId = req?.cookies?.user
    const getMsg = await updateShippingCartService(id, { checkoutAddress, pickUp, userId })
    const response = apiSuccessResponse(getMsg, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const addAllProductsToCart = async (req, res, next) => {
  try {
    const { products } = req.body
    const userId = req?.cookies?.user
    const getMsg = await addAllProductsToCartService(products, userId)
    const response = apiSuccessResponse(getMsg, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addAllProductsToCart,
  addProductToCart,
  createCart,
  deleteCart,
  getAllCart,
  getCart,
  updateShippingCart
}
