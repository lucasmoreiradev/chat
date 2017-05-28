'use strict'

const controller = require('./UploadController')
const Middlewares = require('../../utils/Middlewares')

module.exports = (router) => {
  router.post(`/api/uploads/avatar`, Middlewares.ensureAuthenticated(), controller.avatar)
  router.post(`/api/uploads/cover`, Middlewares.ensureAuthenticated(), controller.cover)
}
