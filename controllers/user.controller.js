const { apiSuccessResponse } = require('../utils/api.utils')
const { STATUS } = require('../utils/constants/httpStatus.constant')
const { loginUserService, registerUserService } = require('../services/user/user.service')

const registerUser = async (req, res, next) => {
  try {
    const { address, email, name, password, phone } = req.body
    const newUser = await registerUserService(address, email, name, password, phone)
    const response = apiSuccessResponse(newUser, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const isValidAuth = await loginUserService(email, password)
    const response = apiSuccessResponse(isValidAuth, STATUS.OK)
    return res.status(STATUS.OK).json(response)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  loginUser,
  registerUser
}
