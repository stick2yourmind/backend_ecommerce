const { Router } = require('express')
const {
  createOrder,
  deleteOrder,
  getOrder,
  getAllOrder,
  finishOrder
} = require('../../controllers/order.controller')

const router = Router()

router.get('/', getAllOrder)

router.get('/:id', getOrder)

router.post('/', createOrder)

router.put('/:id', finishOrder)

router.delete('/:id', deleteOrder)

module.exports = router
