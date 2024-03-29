const { Router } = require('express')
const {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  refreshLogin,
  logoutUser
} = require('../../controllers/user.controller')
const verifyAuth = require('../../middleware/auth.middleware')

const router = Router()

router.get('/logout', logoutUser)

router.get('/refresh', refreshLogin)

router.post('/login', loginUser)

router.post('/register', registerUser)

router.delete('/delete', verifyAuth, deleteUser)

router.put('/:id', verifyAuth, updateUser)

module.exports = router
