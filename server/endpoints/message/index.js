'use strict'

const controller = require('./MessageController')
const Middlewares = require('../../utils/Middlewares') 

module.exports = (router) => {
  router.post(`/api/messages`, Middlewares.ensureAuthenticated(), controller.create)
  router.get(`/api/messages/direct/:sender`, Middlewares.ensureAuthenticated(), controller.direct)
  router.get(`/api/messages/unseen/:id`, Middlewares.ensureAuthenticated(), controller.unseen)
  router.put(`/api/messages/seen/:id`, Middlewares.ensureAuthenticated(), controller.seen)
  router.put(`/api/messages/see/:id`, Middlewares.ensureAuthenticated(), controller.see)
}
