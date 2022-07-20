const { Schema } = require('mongoose')
const bcrypt = require('bcrypt')
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

const salt = () => bcrypt.genSaltSync(10)
const createHash = password => bcrypt.hashSync(password, salt())

const UserSchema = new Schema({
  address: { required: true, type: String },
  // birthDate: { required: true, type: Date },
  email: { required: true, type: String, unique: true },
  isAdmin: { default: false, required: true, type: Boolean },
  name: { required: true, type: String },
  password: { required: true, type: String },
  phone: { required: true, type: Number, unique: true }
}, { timestamps: true })

UserSchema.pre('save', function (next) {
  this.password = createHash(this.password)
  next()
})

const isDeleteValid = (email) => emailRegex.test(email)

const isValidLogin = (email, password) => {
  const isEmailValid = emailRegex.test(email)
  if (!isEmailValid || password === undefined || !password?.length)
    return false
  return true
}

const isValidRegister = (address, email, name, password, phone) => {
  const isEmailValid = emailRegex.test(email)
  if (
    address === undefined || !address?.length ||
    !isEmailValid ||
    name === undefined || !name?.length ||
    password === undefined || !password?.length ||
    Number.isNaN(Number(phone))
  ) return false
  return true
}

const isValidPassword = (password, encriptedPassword) =>
  bcrypt.compareSync(password, encriptedPassword)

module.exports = {
  UserSchema,
  isDeleteValid,
  isValidLogin,
  isValidPassword,
  isValidRegister
}
