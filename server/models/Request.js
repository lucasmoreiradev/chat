'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  approved: { type: Boolean, default: false },
  id_requester: String,
  id_requested: String
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Request', schema)
