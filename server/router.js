'use strict';

const router = require('express').Router();
const path = require('path');
const publicPath = path.join(__dirname, '../public/');
const Middlewares = require('./utils/Middlewares') 

const appRoutes = [ '/login', '/signup' ]
const authedRoutes = [ '/profile/*', '/', '/chat/*', '/welcome' ]

router.get(appRoutes, Middlewares.handleAuthenticated(), (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
})

router.get(authedRoutes, Middlewares.ensureAuthenticated(), (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
})

require('./endpoints/upload')(router)
require('./endpoints/user')(router)
require('./endpoints/request')(router)
require('./endpoints/message')(router)

module.exports = router
