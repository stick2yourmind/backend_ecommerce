require('dotenv').config()

const EMAIL_CFG = {
  ACCOUNT: process.env.EMAIL_CFG_ACCOUNT,
  EMAIL_SYSTEM_DOMAIN: process.env.EMAIL_SYSTEM_DOMAIN,
  EMAIL_SYSTEM_HOST: process.env.EMAIL_SYSTEM_HOST,
  PASS: process.env.EMAIL_CFG_PASS,
  PORT: process.env.EMAIL_CFG_PORT,
  SERVICE: process.env.EMAIL_CFG_SERVICE
}
module.exports = EMAIL_CFG
