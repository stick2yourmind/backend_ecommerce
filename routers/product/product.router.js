const { Router } = require('express')
const {
  createProduct,
  deleteProduct,
  getAll,
  getProduct,
  updateProduct
} = require('../../controllers/product.controller')

const router = Router()

router.get('/', getAll)

router.get('/:id', getProduct)

router.post('/', createProduct)

router.delete('/:id', deleteProduct)

router.put('/:id', updateProduct)

module.exports = router
