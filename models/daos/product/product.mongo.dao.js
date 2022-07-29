const { Schema } = require('mongoose')
const MongoContainer = require('../../containers/mongo.container')
const CustomError = require('../../../utils/errors/customError')
const STATUS = require('../../../utils/constants/httpStatus.constant')

const ProductSchema = new Schema({
  category: { required: true, type: Array },
  description: { required: true, type: String },
  name: { required: true, type: String },
  photo: { required: true, type: String },
  price: { required: true, type: Number },
  stock: { required: true, type: Number }
}, { timestamps: true })

class MongoProductDao extends MongoContainer {
  constructor () {
    super('products', ProductSchema)
  }

  getByCategory = async (queryCategory) => {
    // db.getCollection("products").find( { category: { $in: ["ferreteria", "herramienta"] } } )

    try {
      const documents = await this.Model.find({ category: { $in: [queryCategory] } })
      return documents
    } catch (error) {
      throw new CustomError(
        error.status || STATUS.SERVER_ERROR,
        `Error occurred while trying to get a documents by category: ${queryCategory}`,
        error.message ? error.message : ''
      )
    }
  }
}

module.exports = MongoProductDao
