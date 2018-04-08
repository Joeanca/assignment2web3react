const io = require('socket.io-client')

export default function () {
  const socket = io.connect('http://localhost:5000')

  function registerHandler(onMessageReceived, onUserJoin, updateChat) {
    socket.on('server message', onMessageReceived)
    socket.on('joined', onUserJoin)
    socket.on('', updateChat)
    
  }

  function unregisterHandler() {
    socket.off('message off')
  }

  socket.on('error', function (err) {
    console.log('received socket error:')
    console.log(err)
  })

  socket.on('send message', function (err) {
    console.log('received message from server')
    console.log(err)
  })


  function register(name, cb) {
    socket.emit('register', name, cb)
  }

  function join(cb) {
    socket.emit('join', cb)
  }

  function leave(cb) {
    socket.emit('leave', cb)
  }

  function message(msg, cb) {
    socket.emit('message', msg , cb)
  }

  function getChatrooms(cb) {
    socket.emit('chatrooms', null, cb)
  }

  function getAvailableUsers(cb) {
    socket.emit('availableUsers', null, cb)
  }

  return {
    register,
    join,
    leave,
    message,
    getChatrooms,
    getAvailableUsers,
    registerHandler,
    unregisterHandler
  }
}