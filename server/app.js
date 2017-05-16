'use strict'

// Main modules
const path = require('path')
const chalk = require('chalk')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')

// App modules
const app = express()
const router = require('./router')

// Absolute paths
const publicPath = path.join(__dirname, '../public/')

// Middlewares
if (process.env.NODE_ENV != 'production') {
  require('../webpack').bindTo(app)
  app.use(morgan('dev'))
}
app.use(helmet())
app.use(bodyParser.json())
//app.use(favicon(path.join(publicPath, '/favicon.ico')))

// Catch all undefined routes
router.get('*', (req, res, next) => {
  const err = new Error()
  err.status = 404
  next(err)
})

// Serve up static files
app.use('/js', express.static(path.join(publicPath, '/js')))
// app.use('/assets', express.static(path.join(publicPath, '/assets')))

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
