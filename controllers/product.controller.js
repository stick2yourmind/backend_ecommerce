const { apiSuccessResponse } = require('../utils/api.utils')
const STATUS = require('../utils/constants/httpStatus.constant')
const {
  createProductService,
  deleteProductService,
  getAllProductService,
  getProductService,
  updateProductService,
  getProductByCategoryService
} = require('../services/product/product.service')

const createProduct = async (req, res, next) => {
  try {
    const { category, description, name, photo, price, stock } = req.body
    const createMsg = await createProductService({
      category,
      description,
      name,
      photo,
      price,
      stock
    })
    const response = apiSuccessResponse(createMsg, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const deleteMsg = await deleteProductService(id)
    const response = apiSuccessResponse(deleteMsg, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const getAllMsg = await getAllProductService()
    const response = apiSuccessResponse(getAllMsg, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const getMsg = await getProductService(id)
    const response = apiSuccessResponse(getMsg, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const getProductByCategory = async (req, res, next) => {
  try {
    const { category } = req.params
    const getMsg = await getProductByCategoryService(category)
    const response = apiSuccessResponse(getMsg, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const { category, description, name, photo, price, stock } = req.body
    const getMsg = await updateProductService(id,
      {
        category,
        description,
        name,
        photo,
        price,
        stock
      })
    const response = apiSuccessResponse(getMsg, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  getAll,
  getProduct,
  getProductByCategory,
  updateProduct
}
