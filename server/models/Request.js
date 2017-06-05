'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  approved: Boolean,
  requester: { type: Schema.ObjectId, ref: 'User'  },
  requested: { type: Schema.ObjectId, ref: 'User' } 
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

schema.post('save', doc => {
  schema.emit('newRequest', doc)
})

module.exports = mongoose.model('Request', schema)
