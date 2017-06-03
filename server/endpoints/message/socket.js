'use strict'

const Message = require('../../models/Message')

module.exports = (sockets) => {
  Message.schema.on('newMessage', message => {
    Message.findById(message._id)
      .populate('receipent sender', '-password')
      .then(message => {
        if (!message.seen) {
          sockets.to(`user:${message.receipent._id}`).emit(`message:${message.sender._id}`, message)
          sockets.to(`user:${message.receipent._id}`).emit(`user:message`, message)
        } else {
          sockets.to(`user:${message.sender._id}`).emit(`message:${message.receipent._id}:seen`, message)
          sockets.to(`user:${message.receipent._id}`).emit(`message:${message.receipent._id}:seen`, message)
        }
      })
      .catch(err => console.log(err))
  })
}
