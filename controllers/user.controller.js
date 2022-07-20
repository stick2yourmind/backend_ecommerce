const { apiSuccessResponse } = require('../utils/api.utils')
const STATUS = require('../utils/constants/httpStatus.constant')
const {
  loginUserService, registerUserService,
  deleteUserService, updateUserService
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
    const response = apiSuccessResponse(loginMsg, STATUS.OK)
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
  registerUser,
  updateUser
}
