const { apiSuccessResponse } = require('../utils/api.utils')
const STATUS = require('../utils/constants/httpStatus.constant')
const {
  addProductToCartService,
  createCartService,
  deleteCartService,
  getAllCartService,
  getCartService
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
    const { itemId, quantity } = req.body
    const getMsg = await addProductToCartService(id, { itemId, quantity })
    const response = apiSuccessResponse(getMsg, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addProductToCart,
  createCart,
  deleteCart,
  getAllCart,
  getCart
}
