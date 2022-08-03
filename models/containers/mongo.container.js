const mongoose = require('mongoose')
const DB_CFG = require('../../config/db.config')
const STATUS = require('../../utils/constants/httpStatus.constant')
const CustomError = require('../../utils/errors/customError')

class MongoContainer {
  static #collectionInstances = {}
  constructor (collection, schema) {
    try {
      if (!MongoContainer.#collectionInstances[collection]) {
        this.connect().then(() => console.log(`Connecting to MongoDB collection: ${collection}...`))
        this.collection = collection
        this.Model = mongoose.model(collection, schema)
        MongoContainer.#collectionInstances[collection] = this
      } else return MongoContainer.#collectionInstances[collection]
    } catch (error) {
      throw new CustomError(
        STATUS.SERVER_ERROR,
        'Error occurred while trying to setup a connection to database',
        error
      )
    }
  }

  async connect () {
    try {
      !DB_CFG.MONGO.options
        ? mongoose.connect(DB_CFG.MONGO.URI)
        : mongoose.connect(DB_CFG.MONGO.URI, DB_CFG.MONGO.options)
      mongoose.connection.on('open',
        () => console.log(`Mongoose: ${this.collection}'s model connected!`))
      mongoose.connection.on('error',
        () => console.log('Mongoose connection could not been established'))
      mongoose.connection.on('disconnected',
        () => console.log('Mongoose default connection: is not connected'))
    } catch (error) {
      throw new CustomError(
        STATUS.SERVER_ERROR,
        'Error occurred while trying to connect to database',
        error
      )
    }
  }

  async isValidId (id) {
    return mongoose.isValidObjectId(id)
  }

  async getAll () {
    try {
      const documents = await this.Model.find({}, { __v: 0, createdAt: 0, updatedAt: 0 }).lean()
      return documents
    } catch (error) {
      throw new CustomError(
        STATUS.SERVER_ERROR,
        'Error occurred while trying to get all documents from db',
        error.message ? error.message : ''
      )
    }
  }

  async getById (id, populateColl = null, fields = null) {
    try {
      let document = {}
      if (!mongoose.isValidObjectId(id))
        throw new CustomError(
          STATUS.BAD_REQUEST,
          `MongoDB's ${id} is not a valid ObjectId`,
          ''
        )

      if (populateColl)
        document = await this.Model.findOne({ _id: id }, { __v: 0 })
          .populate(populateColl, fields)
      else document = await this.Model.findOne({ _id: id }, { __v: 0 })
      if (!document) throw new CustomError(
        STATUS.NOT_FOUND,
        `MongoDB document with id: ${id} could not be found!`,
        ''
      )
      return document
    } catch (error) {
      throw new CustomError(
        error.status || STATUS.SERVER_ERROR,
        `Error occurred while trying to get a document with id: ${id}`,
        error.message ? error.message : ''
      )
    }
  }

  async getBy (key, value) {
    try {
      const document = await this.Model.find({ [key]: value }, { __v: 0 })
      if (!document)
        throw new CustomError(
          STATUS.NOT_FOUND,
          `MongoDB document with key, value: ${key}, ${value} could not be found!`,
          ''
        )
      return document
    } catch (error) {
      throw new CustomError(
        error.status || STATUS.SERVER_ERROR,
        'Error occurred while trying to get a document',
        error.message ? error.message : ''
      )
    }
  }

  async create (payload) {
    try {
      const newDocument = new this.Model(payload)
      const newDocumentSaved = await newDocument.save()
      return newDocumentSaved
    } catch (error) {
      const { password, ...cleanedPayload } = payload
      throw new CustomError(
        STATUS.BAD_REQUEST,
        `Error occurred while trying to save document: ${JSON.stringify(cleanedPayload)}`,
        error.message
      )
    }
  }

  async updateById (id, payload) {
    try {
      if (!mongoose.isValidObjectId(id))
        throw new CustomError(
          STATUS.NOT_FOUND,
          `MongoDB's ${id} is not a valid ObjectId`,
          ''
        )

      const updatedDocument = await this.Model.updateOne({ _id: id }, { $set: { ...payload } })
      if (!updatedDocument.modifiedCount)
        throw new CustomError(
          STATUS.NOT_FOUND,
          `MongoDB's document with id: ${id} could not been found!`,
          ''
        )

      return updatedDocument
    } catch (error) {
      throw new CustomError(
        STATUS.SERVER_ERROR,
        `Error occurred while trying to update document with id: ${id}`,
        error.message ? error.message : ''
      )
    }
  }

  async deleteById (id) {
    try {
      if (!mongoose.isValidObjectId(id))
        throw new CustomError(
          STATUS.SERVER_ERROR,
          `MongoDB's ${id} is not a valid ObjectId`,
          ''
        )

      const deletedDocument = await this.Model.deleteOne({ _id: id })
      if (!deletedDocument.deletedCount)
        throw new CustomError(
          STATUS.SERVER_ERROR,
          `MongoDB's document with id: ${id} could not been found!`,
          ''
        )

      return deletedDocument
    } catch (error) {
      throw new CustomError(
        STATUS.SERVER_ERROR,
        `Error occurred while trying to delete a document with id: ${id}`,
        error.message ? error.message : ''
      )
    }
  }
}

module.exports = MongoContainer
