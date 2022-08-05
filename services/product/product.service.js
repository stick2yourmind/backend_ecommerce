const DaosFactory = require('../../models/daos/factory.daos')
const CustomError = require('../../utils/errors/customError')
const STATUS = require('../../utils/constants/httpStatus.constant')
const { isValidProduct } = require('../../utils/validators/product.utils')

const ProductDao = DaosFactory.getDaos('product').ProductDao

/**
 * Creates a product at DB.
 *
 * @param {object} { category: string, description:string, name, photo, price, stock }
 * @return {object} {created: true} if creation was successful
 */
const createProductService = async ({ category, description, name, photo, price, stock }) => {
  try {
    if (!isValidProduct({ category, description, name, photo, price, stock }))
      throw new CustomError(STATUS.UNAUTHORIZED,
        'Missing or invalid: category or description or name or photo or price or stock', '')
    category = category.map(category => category.toLowerCase())
    const data = await ProductDao.create({ category, description, name, photo, price, stock })
    return {
      _id: data._id,
      category: data.category,
      description: data.description,
      name: data.name,
      photo: data.photo,
      price: data.price,
      stock: data.stock
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
 * Gets all products from database.
 *
 * @return {array} array of products
 */
const getAllProductService = async () => {
  try {
    const data = await ProductDao.getAll()
    return { products: data }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to get all products',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}
/**
 * Gets a products from database by its id.
 *
 * @param {string} id
 * @return {object} products
 */
const getProductService = async (id) => {
  try {
    const data = await ProductDao.getById(id)
    return {
      _id: data._id,
      category: data.category,
      description: data.description,
      name: data.name,
      photo: data.photo,
      price: data.price,
      stock: data.stock
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
 * Gets a products from database by its category.
 *
 * @param {string} category
 * @return {object} products
 */
const getProductByCategoryService = async (category) => {
  try {
    const data = await ProductDao.getByCategory(category)
    return { products: data }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to get a product',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}
/**
 * Deletes a product by its id
 *
 * @param {string} id
 * @return {object} { deleted: true }  if register was successful
 */
const deleteProductService = async (id) => {
  try {
    await ProductDao.deleteById(id)
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
 * Updates an product, needs all product's properties
 *
 * @param {string} id
 * @param {object} { category, description, name, photo, price, stock }
 * @return {object} { updated: true }  if update was successful
 */
const updateProductService = async (id, { category, description, name, photo, price, stock }) => {
  try {
    if (!isValidProduct({ category, description, name, photo, price, stock }))
      throw new CustomError(
        STATUS.UNAUTHORIZED,
        'Missing or invalid:  category or description or name or photo or price or stock', '')
    category = category.map(category => category.toLowerCase())
    await ProductDao.updateById(id, { category, description, name, photo, price, stock })
    const data = await ProductDao.getById(id)
    return {
      _id: data._id,
      category: data.category,
      description: data.description,
      name: data.name,
      photo: data.photo,
      price: data.price,
      stock: data.stock
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
  createProductService,
  deleteProductService,
  getAllProductService,
  getProductByCategoryService,
  getProductService,
  updateProductService
}
