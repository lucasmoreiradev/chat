
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
          receipend: req.user._id,
          sender: req.params.sender
        },
        {
          receipend: req.params.sender,
          sender: req.user._id
        }
      ]
    })
    .populate('receipend')
    .populate('sender')
    .then(message => res.json(message))
    .catch(err => res.send(err).status(500))
  }

  static seen (req, res) {

  }

}

module.exports = MessageController 

