'use strict'

const LocalStrategy = require('passport-local').Strategy

let User = require('../../models/User')

module.exports = (passport) => {

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({
      email: email
    }, (err, user) => {
      if (err) return done(err, null)
      if (user) return done(null, false)

      let newUser = new User()
      newUser.avatar_url = "https://api.adorable.io/avatars/285/" + req.body.username
      newUser.email = email
      newUser.username = req.body.username
      newUser.password = newUser.generateHash(password)

      newUser.save((err, newUser) => {
        return done(err, newUser)
      })
    })
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    failureRedirect : '/login',
  }, (email, attempt, done) => {
    User.findOne({
      email: email
    }, (err, user) => {
      if (err) return done(err, null)
      if (!user) return done(null, false)

      if (!user.validPassword(attempt, user.password)) {
        return done(null, false)
      }

      done(null, user)
    })
  }))

}

