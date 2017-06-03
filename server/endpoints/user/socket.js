'use strict'

const User = require('../../models/User')

module.exports = (sockets) => {
  User.schema.on('newUser', user => {
    sockets.emit(`user:${user._id}:save`, user)
  })
}
