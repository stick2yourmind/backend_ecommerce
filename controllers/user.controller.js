const JWT_CFG = require('../config/jwt.config')
const { apiSuccessResponse } = require('../utils/api.utils')
const STATUS = require('../utils/constants/httpStatus.constant')
const {
  loginUserService, registerUserService,
  deleteUserService, updateUserService,
  refreshLoginService
} = require('../services/user/user.service')

const registerUser = async (req, res, next) => {
  try {
    const { address, email, name, password, phone } = req.body
    const registerMsg = await registerUserService(address, email, name, password, phone)
    const response = apiSuccessResponse(registerMsg, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const loginMsg = await loginUserService(email, password)
    const { refreshToken, ...data } = loginMsg
    res.cookie('refreshToken', refreshToken,
      { httpOnly: true, maxAge: JWT_CFG.EXPIRES_REFRESH_TOKEN_MILLISECONDS })
    const response = apiSuccessResponse(data, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const refreshLogin = async (req, res, next) => {
  try {
    const refreshTokenCookie = req?.cookies?.refreshToken
    const loginMsg = await refreshLoginService(refreshTokenCookie)
    const { refreshToken, ...data } = loginMsg
    res.cookie('refreshToken', refreshToken,
      { httpOnly: true, maxAge: JWT_CFG.EXPIRES_REFRESH_TOKEN_MILLISECONDS })
    const response = apiSuccessResponse(data, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}
const deleteUser = async (req, res, next) => {
  try {
    const { email } = req.body
    const deleteMsg = await deleteUserService(email)
    const response = apiSuccessResponse(deleteMsg, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { address, email, name, password, phone } = req.body
    const updateMsg = await updateUserService(id, address, email, name, password, phone)
    const response = apiSuccessResponse(updateMsg, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  deleteUser,
  loginUser,
  refreshLogin,
  registerUser,
  updateUser
}
