const { Router } = require('express')
const {
  addProductToCart,
  createCart,
  deleteCart,
  getAllCart,
  getCart
} = require('../../controllers/cart.controller')

const router = Router()

router.get('/', getAllCart)

router.get('/:id', getCart)

router.post('/', createCart)

router.delete('/:id', deleteCart)

router.put('/:id', addProductToCart)

module.exports = router
