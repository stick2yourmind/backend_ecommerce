const { Router } = require('express')
const {
  addProductToCart,
  createCart,
  deleteCart,
  getAllCart,
  getCart,
  addAllProductsToCart,
  updateShippingCart
} = require('../../controllers/cart.controller')

const router = Router()

router.get('/', getAllCart)

router.get('/:id', getCart)

router.post('/', createCart)

router.delete('/:id', deleteCart)

router.put('/shipping/:id', updateShippingCart)

router.put('/:id', addProductToCart)

router.post('/products', addAllProductsToCart)

module.exports = router
