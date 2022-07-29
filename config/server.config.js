require('dotenv').config()

const CONFIG = {
  ALLOWED_ORIGINS: [
    'http://127.0.0.1:5500',
    'http://localhost:4173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    process.env.ALLOWED_ORIGINS
  ],
  HOST: process.env.HOST,
  PORT: process.env.PORT
}

module.exports = CONFIG
