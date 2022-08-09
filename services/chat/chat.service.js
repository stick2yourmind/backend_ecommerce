
let connections = []

const ioConnection = (io) => {
  io.on('connection', socket => {
    // console.log('socket.handshake.query: ', socket.handshake.query)
    // console.log('socket.handshake.headers.cookie', socket.handshake.headers.cookie)
    // console.log('socket.request.headers.authorization', socket.request.headers.authorization)
    // console.log('socket id: ', socket.id)
    console.log('Nuevo cliente conectado!')
    connections.push({
      accessToken: socket.request.headers.authorization?.split(' ')[1] || undefined,
      clientId: socket.handshake.query.clientId,
      socketId: socket.id
    })
    console.log('connections: ', connections)
    socket.on('msgToServer', data => {
      console.log('msgToServer received', data)
      io.sockets.emit('msgToClient', 'Buenas')
    })
    socket.on('disconnect', (reason) => {
      console.log(reason)
      console.log('socket id: ', socket.id)
      const newCon = connections.filter(connection => connection.socketId !== socket.id)
      connections = newCon
      console.info('🚀 ~ file: chat.service.js ~ line 22 ~ socket.on ~ connections', connections)
    })
  })
}

module.exports = ioConnection
