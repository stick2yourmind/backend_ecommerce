require('dotenv').config()

const DB_CFG = {
  MONGO: {
    OPTIONS: null,
    URI: process.env.MONGO_URI
  },
  TYPE_SYSTEM: process.env.TYPE_SYSTEM,
  TYPE_USER: process.env.TYPE_USER
}

module.exports = DB_CFG
