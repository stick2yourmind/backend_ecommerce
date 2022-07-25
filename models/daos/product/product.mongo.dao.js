const { Schema } = require('mongoose')
const MongoContainer = require('../../containers/mongo.container')

const ProductSchema = new Schema({
  category: { required: true, type: String },
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
}

module.exports = MongoProductDao
