
const _ = require('lodash')
const Request = require('../../models/Request')
const User = require('../../models/User')

class RequestController {

  static create (req, res) {
    Request.create(req.body)
      .then(request => {
        return res.json(request)
      })
      .catch(err => res.send(err))
  }

  static pendingMe (req, res) {
    Request.find({
      requested: req.user._id,
      approved: null
    })
    .populate('requester', '-password')
    .then(requests => res.json(requests))
    .catch(err => res.send(err))
  }

  static findById (req, res) {
    Request.findById(req.params.id)
      .populate('requester', '-password')
      .then(request => {
        return res.json(request)
      })
      .catch(err => res.send(err).status(500))
  }

  static match (req, res) {
    Request.findOne({
      $or: [{
        requester: req.user._id,
        requested: req.params.id,
        approved: null
      },
      {
        requester: req.params.id,
        requested: req.user._id,
        approved: null
      }]
    })
      .then(request => res.json(request))
      .catch(err => res.send(err))
  }

  static update (req, res) {
    Request.findById(req.params.id)
      .populate('requester requested', '-password')
      .then(request => {
        if (!request) res.sendStatus(400)

        const updated = _.merge(request, req.body)

        if (updated.approved) {
          User.findById(request.requested._id)
            .then(requested => {
              requested.friends.push(request.requester._id)
              requested.save()
            })

          User.findById(request.requester._id)
            .then(requester => {
              requester.friends.push(request.requested._id)
              requester.save()
            })
        }
        updated.save()
          .then(request => res.json(request))
          .catch(err => res.send(err).status(500))
      })
  }

}

module.exports = RequestController

