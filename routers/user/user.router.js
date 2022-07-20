const { Router } = require('express')
const {
  registerUser,
  loginUser
} = require('../../controllers/user.controller')

const router = Router()

router.post('/login', loginUser)

router.post('/register', registerUser)

module.exports = router
