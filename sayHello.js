'use strict'

const sayHello = (name) => {
  console.log('Hello ' + (name || ''))
}

// Export all methods
module.exports = sayHello
