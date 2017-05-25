'use strict'

const _ = require('lodash')
const User = require('../../models/User')

class UserController {

  static create (req, res) {

  }

  static me (req, res) {

  }

  // Get a single team
  static show (req, res) {
    User.findOne({
      username: req.params.username 
    })
      .then(user=> {
        if (!user) return res.sendStatus(404)
        return res.json(user)
      })
      .catch(err => res.send(err))
  }

  static update(req, res) {
    if (req.params.id != req.user._id) return res.sendStatus(401)

    User.findById(req.user._id, (err, user) => {
      if (err) return res.send(err)
      if (!user) return res.sendStatus(404)

      var updated = _.merge(user, req.body)
      updated.save((err, user) => {
        if (err) return res.send(err)
        res.json(user)
      })
    })
  }

}

module.exports = UserController 

