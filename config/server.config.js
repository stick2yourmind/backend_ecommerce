require('dotenv').config()

const CONFIG = {
  ALLOWED_ORIGINS: [
    'http://localhost:4173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    process.env.ALLOWED_ORIGINS,
    process.env.ALLOWED_ORIGINS_ALTER,
    process.env.ALLOWED_ORIGIN_WS
  ],
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  USER_COOKIES_EXPIRES: process.env.EXPIRES_USER_COOKIE_MILISECONDS
}

module.exports = CONFIG
