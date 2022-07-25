const { Router } = require('express')
const userRoutes = require('./user/user.router')
const productRoutes = require('./product/product.router')
const cartRoutes = require('./cart/cart.router')
const orderRoutes = require('./order/order.router')

const router = Router()

// API Routes
router.use('/user', userRoutes)
router.use('/product', productRoutes)
router.use('/cart', cartRoutes)
router.use('/order', orderRoutes)

module.exports = router
