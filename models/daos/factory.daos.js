const MongoCartDao = require('./cart/cart.mongo.dao')
const MongoMessageDao = require('./message/message.mongo.dao')
const MongoOrderDao = require('./order/order.mongo.dao')
const MongoProductDao = require('./product/product.mongo.dao')
const MongoUserDao = require('./user/user.mongo.dao')

class DaosFactory {
  static getDaos (type) {
    let CartDao
    let MessageDao
    let OrderDao
    let ProductDao
    let UserDao
    switch (type.toLowerCase()) {
      case 'cart':
        CartDao = new MongoCartDao()
        break
      case 'message':
        MessageDao = new MongoMessageDao()
        break
      case 'order':
        OrderDao = new MongoOrderDao()
        break
      case 'product':
        ProductDao = new MongoProductDao()
        break
      case 'user':
        UserDao = new MongoUserDao()
        break
      default:
        throw new Error(`Invalid data source, please provide one of the following 
        < cart | message | order | product | user >. Not ${type}`)
    }
    return {
      CartDao,
      MessageDao,
      OrderDao,
      ProductDao,
      UserDao
    }
  }
}

module.exports = DaosFactory
