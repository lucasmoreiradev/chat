'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestemp = require('./plugins/timestemp')

const schema = new Schema({
  text: String,
  seen: { type: Boolean, default: false },
  receipend: { type: Schema.ObjectId, ref: 'User' },
  sender: { type: Schema.ObjectId, ref: 'User' }
})

schema.plugin(timestemp)

schema.post('save', doc => {
  schema.emit('newMessage', doc)
})

module.exports = mongoose.model('Message', schema)
