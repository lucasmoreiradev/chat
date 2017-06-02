'use strict'

const Message = require('../../models/Message')

module.exports = (sockets) => {
  Message.schema.on('newMessage', message => {
    Message.findById(message._id)
      //@TODO entregar ao socket somente os campos que forem necessarios da msg
      .populate('receipend sender', '-password')
      .then(message => {
        sockets.to(`user:${message.receipend._id}`).emit(`message:${message.sender._id}`, message)
      })
      .catch(err => console.log(err))
  })

}
