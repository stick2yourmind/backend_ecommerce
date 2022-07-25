const { Router } = require('express')
const verifyAuth = require('../../middleware/auth.middleware')
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

router.post('/', verifyAuth, createProduct)

router.delete('/:id', verifyAuth, deleteProduct)

router.put('/:id', verifyAuth, updateProduct)

module.exports = router
