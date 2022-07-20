const { UserSchema } = require('../../../utils/validators/user.utils')
const CustomError = require('../../../utils/errors/customError')
const STATUS = require('../../../utils/constants/httpStatus.constant')
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
        throw new CustomError(
          STATUS.NOT_FOUND,
          `MongoDB document with email: ${userEmail} could not be found!`, '')
      return document
    } catch (error) {
      throw new CustomError(
        error.status || STATUS.SERVER_ERROR,
        `Error occurred while trying to get a document from db by email: ${userEmail}`,
        error.message ? error.message : ''
      )
    }
  }

  async deleteByEmail (email) {
    try {
      const response = await this.Model.deleteOne({ email })
      if (!response.deletedCount)
        throw new CustomError(
          STATUS.NOT_FOUND,
        `MongoDB document with email: ${email} could not be found!`, '')
    } catch (error) {
      throw new CustomError(
        error.status || STATUS.SERVER_ERROR,
        `Error occurred while trying to delete a document from db with email: ${email}`,
        error.message ? error.message : ''
      )
    }
  }

  async updateByEmail (email, payload) {
    try {
      // eslint-disable-next-line object-shorthand
      const updatedDocument = await this.Model.updateOne({ email: email }, { $set: { ...payload } })
      if (!updatedDocument.matchedCount)
        throw new CustomError(
          STATUS.NOT_FOUND,
          'Document could not been updated',
          `MongoDB's document with email: ${email} could not been found!`
        )
      return updatedDocument
    } catch (error) {
      throw new CustomError(
        error.status || STATUS.SERVER_ERROR,
        `Error occurred while trying to update a document from db with email: ${email}`,
        error.message ? error.message : ''
      )
    }
  }
}

module.exports = MongoUserDao
