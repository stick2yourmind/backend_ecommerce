const jwt = require('jsonwebtoken')
const JWT_CFG = require('../config/jwt.config')
const CustomError = require('../utils/errors/customError')
const STATUS = require('../utils/constants/httpStatus.constant')

const verifyAuth = (req, res, next) => {
  // console.log('🚀 ~ file: auth.middleware.js ~ line 8 ~ verifyJWT ~ req.headers', req.headers)
  const authHeader = req.headers.authorization
  if (!authHeader)
    throw new CustomError(STATUS.UNAUTHORIZED, 'Missing access token', '')
  const token = authHeader.split(' ')[1]
  jwt.verify(
    token,
    JWT_CFG.ACCESS_TOKEN_SECRET,
    (error, decoded) => {
      if (error)
        throw new CustomError(STATUS.FORBIDDEN, 'Invalid access token', '')
      req.user = decoded.user
      next()
    }
  )
}

module.exports = verifyAuth
