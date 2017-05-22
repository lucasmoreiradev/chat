'use strict';

const timestemp = (schema, options) => {
  schema.add({
    created_at: { type: Date, default: Date.now() }
  })
  schema.add({
    update_at: { type: Date, default: Date.now() }
  })
}

module.exports = timestemp
