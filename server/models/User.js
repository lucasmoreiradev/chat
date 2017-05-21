'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestemp = require('./plugins/timestemp')
const bcrypt = require('bcryptjs')

var schema = new Schema({
  email: { type: String, lowercase: true },
  password: String,
  username: String,
  avatar_url: String,
  cover_url: String,
  description: String,
  active: { type: Boolean, default: true },
})

schema.plugin(timestemp)

schema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
schema.methods.validPassword = (attempt, password) => {
  return bcrypt.compareSync(attempt, password)
}

module.exports = mongoose.model('User', schema)
