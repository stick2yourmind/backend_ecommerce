const { Router } = require('express')
const userRoutes = require('./user/user.router')
const productRoutes = require('./product/product.router')
// const specialtyRoutes = require('./specialty/specialty.router')
// const contactMessageRoutes = require('./contactMessage/contactMessage.router')

const router = Router()

// API Routes
router.use('/user', userRoutes)
router.use('/product', productRoutes)
// router.use('/specialties', specialtyRoutes)
// router.use('/contactMessages', contactMessageRoutes)

module.exports = router
