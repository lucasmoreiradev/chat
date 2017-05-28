'use strict'

const CloudinaryUtils = require('../../utils/CloudinaryUtils')
const User = require('../../models/User')

class UploadController {

  static avatar (req, res) {
    const file = JSON.parse(req.body.toString())
    CloudinaryUtils.handleUpload(file)
      .then(result => {
        User.findById(req.user._id)
          .then(user => {
            user.avatar_url = result.url
            user.save((err, newUser) => {
              if (err) res.send(err).status(500)
              res.json({ path: result.url })
            })
          })
      })
      .catch(err => res.send(err).status(500))
  }

  static cover (req, res) {
    const file = JSON.parse(req.body.toString())
    CloudinaryUtils.handleUpload(file)
      .then(result => {
        User.findById(req.user._id)
          .then(user => {
            user.cover_url = result.url
            user.save((err, newUser) => {
              if (err) res.send(err).status(500)
              res.json({ path: result.url })
            })
          })
      })
      .catch(err => res.send(err).status(500))
  }

}

module.exports = UploadController
