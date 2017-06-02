'use strict'

const sockets = require('socket.io')
const mongoose = require('mongoose')
const passportSocketIo = require('passport.socketio')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const chalk = require('chalk')

const bindListeners = (io) => {
  // Auth and attach req.user to the socket
  io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key:          'express.sid',
    secret:       'keyboard cat',
    store:        new MongoStore({mongooseConnection: mongoose.connection})
  }))

  io.on('connection', (socket) => {
    if (!socket.request.user) return 

    socket.join(`user:${socket.request.user._id}`)
    console.log(chalk.yellow(`socket-io: ${socket.request.user.username} connected`))

    socket.on('disconnect', () => {
      console.log(chalk.yellow(`socket-io: ${socket.request.user.username} disconnected`))
    })
  })


  require('./endpoints/message/socket')(io)
}

exports.connectTo = (server) => {
  const io = sockets(server)
  bindListeners(io)
}
