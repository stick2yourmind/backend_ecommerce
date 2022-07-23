const DaosFactory = require('../../models/daos/factory.daos')
const CustomError = require('../../utils/errors/customError')
const STATUS = require('../../utils/constants/httpStatus.constant')

const MessageDao = DaosFactory.getDaos('message').MessageDao
const UserDao = DaosFactory.getDaos('user').UserDao

/**
 *
 *
 * @param {Object} messageInfo { userId, message, ownerMsgId }
 * @param {string} messageInfo.userId - User's id
 * @param {string} messageInfo.ownerId - Owner of current message'id
 * @param {string} messageInfo.message - Message
 * @return {{
 *     _id: string,
 *     message: string,
 *     type: string,
 *     user: string
 *   }} message - Copy of message created at DB.
 */
const createMessageService = async (messageInfo) => {
  try {
    const ownerMsg = UserDao.getById(messageInfo.ownerMsgId)
    const type = ownerMsg.email
    const data = await MessageDao
      .create({ message: messageInfo.message, type, user: messageInfo.userId })
    return {
      _id: data._id,
      message: data.message,
      type: data.type,
      user: data.user
    }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to create a product',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}
/**
 * Gets all messages from an user
 *
 * @param {string} userId - User's id
 * @return {{
 * messages: {
 *     _id: string,
 *     message: string,
 *     type: string,
 *     user: string
 *   }[]
 * }}
 */
const getAllMessageService = async (userId) => {
  try {
    const data = await MessageDao.getBy('user', userId)
    return { messages: data }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to get all products',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}
/**
 * Deletes a message by its id
 *
 * @param {string} messageId - Message's id
 * @return {{deleted: boolean}} returns true if message could be deleted
 */
const deleteMessageService = async (messageId) => {
  try {
    await MessageDao.deleteById(messageId)
    return { deleted: true }
  } catch (error) {
    throw new CustomError(
      error.status || STATUS.SERVER_ERROR,
      'Error occurred on service while trying to delete a message',
      error.message + (error.details ? ` --- ${error.details}` : '')
    )
  }
}

module.exports = {
  createMessageService,
  deleteMessageService,
  getAllMessageService
}
