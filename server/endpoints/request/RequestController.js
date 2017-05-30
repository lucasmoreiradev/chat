
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

  static match (req, res) {
    Request.findOne({
      $or: [{
        id_requester: req.user._id,
        id_requested: req.params.id,
        approved: false
      }, 
      {
        id_requester: req.params.id,
        id_requested: req.user._id,
        approved: false
      }]
    })
      .then(request => res.json(request))
      .catch(err => res.send(err))
  }

  static update (req, res) {
    Request.findById(req.params.id)
      .then(request => {
        if (!request) res.sendStatus(400)

        const updated = _.merge(request, req.body)
        
        if (updated.approved) {
          User.findById(request.id_requested)
            .then(requested => {
              requested.friends.push(request.id_requester)
              requested.save()
            })

          User.findById(request.id_requester)
            .then(requester => {
              requester.friends.push(request.id_requested)
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

