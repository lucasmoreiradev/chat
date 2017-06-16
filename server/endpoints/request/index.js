'use strict'

const controller = require('./RequestController')
const Middlewares = require('../../utils/Middlewares') 

module.exports = (router) => {
  router.post(`/api/requests`, Middlewares.ensureAuthenticated(), controller.create)
  router.get(`/api/requests/pending/me`, Middlewares.ensureAuthenticated(), controller.pendingMe)
  router.get(`/api/requests/pending/:id`, Middlewares.ensureAuthenticated(), controller.match)
  router.get(`/api/requests/:id`, Middlewares.ensureAuthenticated(), controller.findById)
  router.put(`/api/requests/:id`, Middlewares.ensureAuthenticated(), controller.update)
}
