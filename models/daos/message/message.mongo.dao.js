const { MessageSchema } = require('../../../utils/validators/message.utils')
const MongoContainer = require('../../containers/mongo.container')

class MongoMessageDao extends MongoContainer {
  constructor () {
    super('messages', MessageSchema)
  }
}

module.exports = MongoMessageDao
