const { apiSuccessResponse } = require('../utils/api.utils')
const STATUS = require('../utils/constants/httpStatus.constant')
const {
  createOrderService,
  finishOrderService,
  deleteOrderService,
  getAllOrderService,
  getOrderService
} = require('../services/order/order.service')

const createOrder = async (req, res, next) => {
  try {
    const { cartId } = req.body
    const createdOrder = await createOrderService(cartId)
    const response = apiSuccessResponse(createdOrder, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedContactMessageRes = await deleteOrderService(id)
    const response = apiSuccessResponse(deletedContactMessageRes, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const finishOrder = async (req, res, next) => {
  try {
    const { id } = req.params
    const createdContactMessage = await finishOrderService(id)
    const response = apiSuccessResponse(createdContactMessage, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const getAllOrder = async (req, res, next) => {
  try {
    const contactMessages = await getAllOrderService()
    const response = apiSuccessResponse(contactMessages, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params
    const contactMessage = await getOrderService(id)
    const response = apiSuccessResponse(contactMessage, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createOrder,
  deleteOrder,
  finishOrder,
  getAllOrder,
  getOrder
}
