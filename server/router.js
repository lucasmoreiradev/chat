'use strict';

const router = require('express').Router();
const path = require('path');
const publicPath = path.join(__dirname, '../public/');

router.get([ '/', '/profile', '/login' ], (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
})

module.exports = router
