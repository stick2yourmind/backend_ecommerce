const CONFIG = require('../config/server.config')

const credentials = (req, res, next) => {
  const origin = req.headers.origin
  console.log('🚀 ~ file: cors.middleware.js ~ line 5 ~ credentials ~ origin', origin)
  console.log('🚀 ~ file: cors.middleware.js ~ line 7 ~ credentials ~ CONFIG.ALLOWED_ORIGINS', CONFIG.ALLOWED_ORIGINS)
  if (CONFIG.ALLOWED_ORIGINS.includes(origin))
    res.header('Access-Control-Allow-Credentials', true)

  next()
}

module.exports = credentials
