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

  static update (req, res) {

  }
}

module.exports = UserController 

