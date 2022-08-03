require('dotenv').config()

const ROLE_CFG = {
  ADMIN: process.env.ADMIN_ROLE,
  USER: process.env.USER_ROLE
}

module.exports = ROLE_CFG
