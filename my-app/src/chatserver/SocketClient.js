const io = require('socket.io-client')

export default function () {
  const socket = io.connect('https://warm-cliffs-39151.herokuapp.com/')

  function registerHandler(onMessageReceived, onUserJoin, updateChat) {
    socket.on('server message', onMessageReceived)
    socket.on('joined', onUserJoin)
    socket.on('updatechat', updateChat)

    
  }
  function loginHandler(onLogin){
    socket.on('login', onLogin);
  }

  function logoutHandler(onLogout){
    socket.on('logout', onLogout);    
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

  function login(cb) {
    socket.emit('login', cb)
  }

  function logout(cb) {
    console.log("logging out")
    socket.emit('logout', cb)
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
    login,
    logout,
    message,
    getChatrooms,
    getAvailableUsers,
    registerHandler,
    unregisterHandler, 
    loginHandler,
    logoutHandler
  }
}