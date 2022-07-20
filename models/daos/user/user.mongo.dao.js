const { UserSchema } = require('../../../utils/validators/user.utils')
const MongoContainer = require('../../containers/mongo.container')

class MongoUserDao extends MongoContainer {
  constructor () {
    super('users', UserSchema)
  }

  async getByEmail (userEmail, populateColl = null, fields = null) {
    try {
      let document = {}
      if (populateColl)
        document = await this.Model.findOne({ email: userEmail }, { __v: 0 })
          .populate(populateColl, fields)
      else document = await this.Model.findOne({ email: userEmail }, { __v: 0 })
      if (!document)
        throw new Error(`MongoDB document with email: ${userEmail} could not be found!`)
      return document
    } catch (error) {
      throw new Error(
        `Error occurred while trying to get a document from db by email: ${userEmail}, ${error}`
      )
    }
  }
}

module.exports = MongoUserDao
