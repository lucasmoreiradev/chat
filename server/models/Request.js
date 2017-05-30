'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestemp = require('./plugins/timestemp')

const schema = new Schema({
  approved: { type: Boolean, default: false },
  id_requester: String,
  id_requested: String
})

schema.plugin(timestemp)

module.exports = mongoose.model('Request', schema)
