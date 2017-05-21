'use strict'

'use strict'

const passport = require('passport')
const User = require('../models/User')

module.exports = (app) => {

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user)
    }).catch(err => done(err, null))
  })

  require('./strategies/local')(passport)

  app.post('/signup', passport.authenticate('local-signup'), (req, res) => {
    res.json(req.user)
  })

  app.post('/login', passport.authenticate('local-login'), (req, res) => {
    if (req.user) {
      res.json(req.user)
    }
  })

  app.get('/logout', (req, res) => {
    if (req.user) {
      req.logout()
    }
    res.redirect('/login')
  })

}

