const DaosFactory = require('../../models/daos/factory.daos')
const CustomError = require('../../utils/errors/customError')
const STATUS = require('../../utils/constants/httpStatus.constant')
const {
  isValidLogin, isDeleteValid,
  isValidPassword, isValidRegister
} = require('../../utils/validators/user.utils')

const UserDao = DaosFactory.getDaos('user').UserDao

/**
 * Returns true if logins if succesfull.
 *
 * @param {string} email - User's email
 * @param {string} password - Raw user's password
 * @return {object} {logged: true} if login was successful
 */
const loginUserService = async (email, password) => {
  try {
    if (!isValidLogin(email, password))
      throw new CustomError(STATUS.UNAUTHORIZED, 'Missing or invalid: email or password', '')
    const data = await UserDao.getByEmail(email)
    if (!isValidPassword(password, data.password))
      throw new CustomError(STATUS.UNAUTHORIZED, 'Missing or invalid: email or password', '')
    return {
      _id: data._id,
      address: data.address,
      email: data.email,
      logged: true,
      name: data.name,
      phone: data.phone
    }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.UNAUTHORIZED,
      'Error occurred on service while trying to login an user',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}
/**
 * Register a new user. It saves encrypted password at db.
 *
 * @param {string} address - user's address
 * @param {string} email - user's email
 * @param {string} name - user's name
 * @param {string} password - user's password
 * @param {number} phone - user's phone
 * @return {object} { registered: true }  if register was successful
 */
const registerUserService = async (address, email, name, password, phone) => {
  try {
    if (!isValidRegister(address, email, name, password, phone))
      throw new CustomError(
        STATUS.UNAUTHORIZED,
        'Missing or invalid: address or email or name or password or phone', '')
    const data = await UserDao.create({ address, email, name, password, phone })
    return {
      _id: data._id,
      address: data.address,
      email: data.email,
      name: data.name,
      phone: data.phone,
      registered: true
    }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to register an user',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}
/**
 * Deletes a registered user.
 *
 * @param {string} email
 * @return {object} { deleted: true }  if register was successful
 */
const deleteUserService = async (email) => {
  try {
    if (!isDeleteValid(email))
      throw new CustomError(
        STATUS.NOT_FOUND,
        'Missing or invalid: email', '')
    await UserDao.deleteByEmail(email)
    return { deleted: true }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to delete an user',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}
/**
 * Updates an user, needs all user's properties
 *
 * @param {string} id
 * @param {string} address
 * @param {string} email
 * @param {string} name
 * @param {string} password
 * @param {number} phone
 * @return {object} { updated: true }  if update was successful
 */
const updateUserService = async (id, address, email, name, password, phone) => {
  try {
    if (!isValidRegister(address, email, name, password, phone))
      throw new CustomError(
        STATUS.UNAUTHORIZED,
        'Missing or invalid: address or email or name or password or phone', '')
    await UserDao.updateById(id, { address, email, name, password, phone })
    const data = await UserDao.getById(id)
    return {
      _id: data._id,
      address: data.address,
      email: data.email,
      name: data.name,
      phone: data.phone,
      updated: true
    }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to update an user',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}

module.exports = {
  deleteUserService,
  loginUserService,
  registerUserService,
  updateUserService
}
