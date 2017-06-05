'use strict'

const Request = require('../../models/Request')

module.exports = (sockets) => {
  Request.schema.on('newRequest', request => {
    if (request.approved === undefined) {
      sockets.to(`user:${request.requested}`).emit(`request:${request.requester}:created`, request)
    } else if (request.approved) {
      sockets.to(`user:${request.requester._id}`).emit(`request:${request.requested._id}:approved`, request)

      // friendlist
      sockets.emit(`request:approved`, request)
    } else if (!request.approved) {
      sockets.to(`user:${request.requester._id}`).emit(`request:${request.requested._id}:declined`, request)
    }
  })
}
