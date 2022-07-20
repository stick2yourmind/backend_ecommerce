const { Router } = require('express')
const {
  registerUser,
  loginUser,
  deleteUser,
  updateUser
} = require('../../controllers/user.controller')

const router = Router()

router.post('/login', loginUser)

router.post('/register', registerUser)

router.delete('/delete', deleteUser)

router.put('/:id', updateUser)

module.exports = router
