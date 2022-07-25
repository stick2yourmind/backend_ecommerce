const { Router } = require('express')
const userRoutes = require('./user/user.router')
const productRoutes = require('./product/product.router')
const cartRoutes = require('./cart/cart.router')
const orderRoutes = require('./order/order.router')
const verifyAuth = require('../middleware/auth.middleware')

const router = Router()

// API Routes
router.use('/user', userRoutes)
router.use('/product', productRoutes)
router.use('/cart', verifyAuth, cartRoutes)
router.use('/order', verifyAuth, orderRoutes)

module.exports = router
