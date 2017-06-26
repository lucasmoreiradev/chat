'use strict'

const _ = require('lodash')
const User = require('../../models/User')

class UserController {

  static me (req, res) {
    User.findById(req.user._id)
      .select('-password')
      .populate('friends')
      .then((err, user) => {
        if (err) return res.send(err)
        if (!user) return res.sendStatus(404)

        res.json(user);
      })
  }

  static showByUsernameLike (req, res) {
    User.find({
      username: new RegExp(req.query.term, 'i')
    }).select('-password')
      .then(user => {
        if (!user) return res.sendStatus(404) 
        return res.json(user)
      })
      .catch(err => res.send(err))
  }

  static show (req, res) {
    User.findOne({
      username: req.params.username 
    }).select('-password')
      .then(user => {
        if (!user) return res.sendStatus(404)
        return res.json(user)
      })
      .catch(err => res.send(err))
  }

  static update (req, res) {
    if (req.params.id != req.user._id) return res.sendStatus(401)

    User.findById(req.user._id, (err, user) => {
      if (err) return res.send(err)
      if (!user) return res.sendStatus(404)

      let updated = _.merge(user, req.body)
      updated.save((err, user) => {
        if (err) return res.send(err)
        res.json(user)
      })
    })
  }

  static removeFriend (req, res) {
    User.findById(req.user._id, (err, user) => {
      if (err) return res.send(err)
      if (!user) return res.sendStatus(404)

      user.friends = user.friends.filter(id => {
        return id.toString() !== req.params.id.toString()
      })

      user.save()
    })

    User.findById(req.params.id, (err, user) => {
      if (err) return res.send(err)
      if (!user) return res.sendStatus(404)

      user.friends = user.friends.filter(id => {
        return id.toString() !== req.user._id.toString() 
      })

      user.save()
    })

    res.json({}).status(200)
  }

}

module.exports = UserController 

