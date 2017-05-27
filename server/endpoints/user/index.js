'use strict'

const controller = require('./UserController')
const Middlewares = require('../../utils/Middlewares') 

module.exports = (router) => {
  router.get(`/api/users/me`, Middlewares.ensureAuthenticated(), controller.me)
  router.get(`/api/users/search`, Middlewares.ensureAuthenticated(), controller.showByUsernameLike)
  router.get(`/api/users/:username`, Middlewares.ensureAuthenticated(), controller.show)
  router.put(`/api/users/:id`, Middlewares.ensureAuthenticated(), controller.update)
}
