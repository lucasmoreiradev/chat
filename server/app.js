'use strict'

// Main modules
const path = require('path')
const chalk = require('chalk')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

// App modules
const app = express()
const router = require('./router')

// Absolute paths
const publicPath = path.join(__dirname, '../public/')

// Mongoose connection
mongoose.promise = global.Promise
mongoose.connect('mongodb://localhost/chat-dev')

// Middlewares
if (process.env.NODE_ENV != 'production') {
  require('../webpack').bindTo(app)
  app.use(morgan('dev'))
}
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.raw({ limit: '400mb', type: 'application/octect-stream' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(session({
  key: 'express.sid',
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(favicon(path.join(publicPath, '/favicon.ico')))

require('./auth/auth')(app)

// Catch all undefined routes
router.get('*', (req, res, next) => {
  const err = new Error()
  err.status = 404
  next(err)
})

// Serve up static files
app.use('/js', express.static(path.join(publicPath, '/js')))
app.use('/assets', express.static(path.join(publicPath, '/assets')))


// Use the router
app.use('/', router)

// Handle unmatched routes
const handle404 = (err, req, res, next) => {
  if(err.status !== 404) {
    return next()
  }

  res.redirect('/')
}
app.use(handle404)

module.exports = app
