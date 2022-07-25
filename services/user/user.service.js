const jwt = require('jsonwebtoken')
const JWT_CFG = require('../../config/jwt.config')
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
    const accessToken = jwt.sign(
      { emailUser: data.email },
      JWT_CFG.ACCESS_TOKEN_SECRET,
      { expiresIn: JWT_CFG.EXPIRES_ACCESS_TOKEN }
    )
    const refreshToken = jwt.sign(
      { emailUser: data.email },
      JWT_CFG.REFRESH_TOKEN_SECRET,
      { expiresIn: JWT_CFG.EXPIRES_REFRESH_TOKEN }
    )
    await UserDao.updateByEmail(email, { refreshToken })
    return {
      _id: data._id,
      accessToken,
      address: data.address,
      email: data.email,
      logged: true,
      name: data.name,
      phone: data.phone,
      refreshToken
    }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.UNAUTHORIZED,
      'Error occurred on service while trying to login an user',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}

const refreshLoginService = async (refreshTokenCookie) => {
  try {
    if (!refreshTokenCookie)
      throw new CustomError(STATUS.UNAUTHORIZED, 'Missing refresh token', '')
    // jwt.verify throws an error if signature is invalid
    const decoded = await jwt.verify(
      refreshTokenCookie,
      JWT_CFG.REFRESH_TOKEN_SECRET
      // async (error, decoded) => {
      //   const data = await UserDao.getByEmail(decoded.emailUser)
      //   console.log('🚀 ~ file: user.service.js ~ line 66 ~ data.refreshToken', data.refreshToken)
      //   if (error || data.refreshToken !== refreshTokenCookie)
      //     throw new CustomError(STATUS.FORBIDDEN, 'Invalid refreshToken token', '')
      //   const accessToken = jwt.sign(
      //     { emailUser: data.email },
      //     JWT_CFG.ACCESS_TOKEN_SECRET,
      //     { expiresIn: JWT_CFG.EXPIRES_ACCESS_TOKEN }
      //   )
      //   const refreshToken = jwt.sign(
      //     { emailUser: data.email },
      //     JWT_CFG.REFRESH_TOKEN_SECRET,
      //     { expiresIn: JWT_CFG.EXPIRES_REFRESH_TOKEN }
      //   )
      //   const user = UserDao.updateByEmail(data.email, { refreshToken }).then(user => user)
      //   return {
      //     _id: user._id,
      //     accessToken,
      //     address: user.address,
      //     email: user.email,
      //     name: user.name,
      //     phone: user.phone,
      //     refreshToken,
      //     refreshed: true
      //   }
      // }
    )
    const data = await UserDao.getByEmail(decoded.emailUser)
    if (data.refreshToken !== refreshTokenCookie)
      throw new CustomError(STATUS.FORBIDDEN, 'Invalid refresh token', '')
    const accessToken = jwt.sign(
      { emailUser: data.email },
      JWT_CFG.ACCESS_TOKEN_SECRET,
      { expiresIn: JWT_CFG.EXPIRES_ACCESS_TOKEN }
    )
    const refreshToken = jwt.sign(
      { emailUser: data.email },
      JWT_CFG.REFRESH_TOKEN_SECRET,
      { expiresIn: JWT_CFG.EXPIRES_REFRESH_TOKEN }
    )
    const user = UserDao.updateByEmail(data.email, { refreshToken }).then(user => user)
    return {
      _id: user._id,
      accessToken,
      address: user.address,
      email: user.email,
      name: user.name,
      phone: user.phone,
      refreshToken,
      refreshed: true
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
  refreshLoginService,
  registerUserService,
  updateUserService
}
