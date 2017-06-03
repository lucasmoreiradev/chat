
const _ = require('lodash')
const Message = require('../../models/Message')

class MessageController {

  static create (req, res) {
    Message.create(req.body)
      .then(message => {
        return res.json(message)
      })
      .catch(err => res.send(err).status(500))
  }

  static direct (req, res) {
    Message.find({
      $or: [
        {
          receipent: req.user._id,
          sender: req.params.sender
        },
        {
          receipent: req.params.sender,
          sender: req.user._id
        }
      ]
    })
    .populate('receipent sender', '-password')
    .then(message => res.json(message))
    .catch(err => res.send(err).status(500))
  }

  static seen (req, res) {
    Message.findById(req.params.id)
    .then(message => {
      let updated = _.merge(message, req.body)
      updated.save()
        .then(message => {
          return res.json(message)
        })
        .catch(err => res.send(err).status(500))
    })
    .catch(err => res.send(err).status(500))
  }

  static see (req, res) {
    Message.find({
      receipent: req.user._id,
      sender: req.params.id
    })
      .then(messages => {
        for (let message of messages) {
          let updated = _.merge(message, req.body)
          updated.save()
        }
        return res.json(messages)
      })
      .catch(err => res.send(err).status(500))
  }

  static unseen (req, res) {
    Message.find({
      receipent: req.params.id,
      seen: false
    })
      .populate('receipent sender', '-password')
      .then(messages => {
        return res.json(messages)
      })
      .catch(err => console.log(err).status(500))
  }

}

module.exports = MessageController

