
const jwt = require('jsonwebtoken')
const JWT_CFG = require('../../config/jwt.config')
const ROLE_CFG = require('../../config/roles.config')
let connections = []
let adminRoom
const ioConnection = (io) => {
  io.on('connection', socket => {
    const clientId = socket.handshake.query.clientId
    const accessToken = socket.request?.headers?.authorization?.split(' ')[1] || undefined
    socket.join(clientId)
    console.log('Nuevo cliente conectado!')
    const clientData = {
      clientId,
      email: undefined,
      role: undefined
    }

    connections.push(clientData)

    socket.on('messages', data => {
      console.log('messages received', data)
      io.sockets.emit('messages', data)
    })
    socket.on('privateMessages', data => {
      console.log(data)
      if (clientData.role === ROLE_CFG.ADMIN)
        socket.broadcast.to(data.room).emit('privateMessages', { msg: data.msg, systemResponse: true })
      else
        socket.broadcast.to(adminRoom).emit('privateMessages', { clientId, msg: data.msg, systemResponse: false })
    })

    try {
      if (accessToken) {
        console.log('tiene accessToken: ', accessToken)
        console.log('accessToken !== undefined')
        console.log(accessToken !== undefined)
        const decoded = jwt.verify(
          accessToken,
          JWT_CFG.ACCESS_TOKEN_SECRET
        )
        console.log(decoded)
        clientData.email = decoded.emailUser
        clientData.role = decoded.role
        if (decoded.role === ROLE_CFG.ADMIN)
          adminRoom = clientId
          // socket.broadcast.to(clientId).emit('privateMessages', connections)
      }
    } catch (error) {
      console.log('error')
      console.log(error)
    }
    // console.table(connections.map(conn => {
    //   return {
    //     ...conn,
    //     accessToken: conn.accessToken ? (conn?.accessToken?.slice(0, 4) + '...') : undefined
    //   }
    // })
    // )
    io.in(adminRoom).emit('connections', { connections })
    console.table(connections, ['clientId', 'email', 'role'])

    socket.on('disconnect', (reason) => {
      console.log(reason)
      // console.log('socket id: ', socket.id)
      const newCon = connections.filter(connection => connection.clientId !== clientId)
      connections = newCon
      // console.info('🚀 ~ file: chat.service.js ~ line 22 ~ socket.on ~ connections', connections)
    })
  })
}

module.exports = ioConnection
