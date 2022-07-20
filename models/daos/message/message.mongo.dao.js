const { Schema } = require('mongoose')
const MongoContainer = require('../../containers/mongo.container')

const MessageSchema = new Schema({
  message: { required: true, type: String },
  type: { required: true, type: String }, // "user" or "system"
  user: { ref: 'users', required: true, type: Schema.Types.ObjectId }
}, { timestamps: true })

class MongoMessageDao extends MongoContainer {
  constructor () {
    super('messages', MessageSchema)
  }
}

module.exports = MongoMessageDao
