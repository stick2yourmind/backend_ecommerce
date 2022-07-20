const { Router } = require('express')
const userRoutes = require('./user/user.router')
// const professionalRoutes = require('./professional/professional.router')
// const specialtyRoutes = require('./specialty/specialty.router')
// const contactMessageRoutes = require('./contactMessage/contactMessage.router')

const router = Router()

// API Routes
router.use('/user', userRoutes)
// router.use('/professionals', professionalRoutes)
// router.use('/specialties', specialtyRoutes)
// router.use('/contactMessages', contactMessageRoutes)

module.exports = router
