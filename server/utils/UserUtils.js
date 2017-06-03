'use strict'

const User = require('../models/User')
const _ = require('lodash')

class UserUtils {
  static handlePresence (id, active) {
    User.findById(id)
      .then(user => {
        let updated = _.merge(user, { active: active })
        updated.save()
      })
  }
}

module.exports = UserUtils
