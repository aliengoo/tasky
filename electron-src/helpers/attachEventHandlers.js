const _ = require('lodash')

function attachEventHandlers (target, eventHandlers = undefined) {
  if (target) {
    if (!_.isObject(eventHandlers)) {
      return target
    }

    if (!_.isFunction(target.on)) {
      return target
    }

    for (const propertyName of Object.getOwnPropertyNames(eventHandlers)) {
      const value = eventHandlers[propertyName]

      if (_.isFunction(value)) {
        target.on(propertyName, value)
      }
    }
  }

  return target
}

module.exports = attachEventHandlers