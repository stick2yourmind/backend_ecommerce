const DaosFactory = require('../../models/daos/factory.daos')
const CustomError = require('../../utils/errors/customError')
const { STATUS } = require('../../utils/constants/httpStatus.constant')
const {
  isValidLogin,
  isValidPassword, isValidRegister
} = require('../../utils/validators/user.utils')

const UserDao = DaosFactory.getDaos('user').UserDao

/**
 * Returns true if logins if succesfull.
 * Returns false if password is incorrect or user does not exists.
 *
 * @param {string} email - User's email
 * @param {string} password - Raw user's password
 * @return {boolean}
 */
const loginUserService = async (email, password) => {
  try {
    if (!isValidLogin(email, password))
      throw new Error('Missing or invalid: email or password')
    const user = await UserDao.getByEmail(email)
    return { authUser: isValidPassword(password, user.password) }
  } catch (error) {
    throw new CustomError(
      error.statusCode || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to login an user',
      error.message
    )
  }
}
/**
 * Register a new user with. It saves encrypted password at db.
 * Returns true if success or false if not.
 *
 * @param {Object} user - Object which contains user's info to be saved into db
 * @return {boolean}
 */
const registerUserService = async (address, email, name, password, phone) => {
  try {
    if (!isValidRegister(address, email, name, password, phone))
      throw new Error('Missing or invalid: address or email or name or password or phone')
    const newUser = await UserDao.create({ address, email, name, password, phone })
    return newUser.user
  } catch (error) {
    throw new CustomError(
      STATUS.SERVER_ERROR,
      'Error occurred on service while trying to register an user',
      error.message
    )
  }
}
module.exports = {
  loginUserService,
  registerUserService
}
