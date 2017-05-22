'use strict';

const router = require('express').Router();
const path = require('path');
const publicPath = path.join(__dirname, '../public/');
const Middlewares = require('./utils/Middlewares') 

const appRoutes = [ '/', '/login', '/signup' ]
const authedRoutes = [ '/profile', '/dashboard' ]

router.get(appRoutes, Middlewares.handleAuthenticated(), (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
})

router.get(authedRoutes, Middlewares.ensureAuthenticated(), (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
})

module.exports = router
