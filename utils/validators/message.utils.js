const { Schema } = require('mongoose')
const EMAIL_CFG = require('../../config/email.config')
const DB_CFG = require('../../config/db.config')
const hostDomainEmailReg = new RegExp(
  `^[A-Za-z0-9._]+@${EMAIL_CFG.EMAIL_SYSTEM_HOST}.${EMAIL_CFG.EMAIL_SYSTEM_HOST}$`)

const MessageSchema = new Schema({
  message: { required: true, type: String },
  type: { default: DB_CFG.TYPE_USER, required: true, type: String }, // "user" or "system"
  user: { ref: 'users', required: true, type: Schema.Types.ObjectId }
}, { timestamps: true })

const isValidMessage = ({ user, message }) => {
  if (user === undefined || message === undefined)
    return false
  const isString = typeof user === 'string' && typeof message === 'string'
  if (!isString) return false
  return true
}

const isSystemType = (email) => {
  return hostDomainEmailReg.test(email)
}
module.exports = { MessageSchema, isSystemType, isValidMessage }
