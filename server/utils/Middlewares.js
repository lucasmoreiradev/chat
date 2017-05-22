'use strict'

class Middlewares {
  static ensureAuthenticated () {
    return (req, res, next) => {
      if (req.isAuthenticated()) {
        return next()
      }
      res.status(401).redirect('/login')
    }
  }
  static handleAuthenticated () {
    return (req, res, next) => {
      if (req.isAuthenticated()) {
        return res.redirect(`/dashboard`)
      }
      next()
    }
  }
  static protectEndpoint () {
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user.role === 'admin') {
        return next()
      }
      res.sendStatus(401)
    }
  }
}

module.exports = Middlewares
