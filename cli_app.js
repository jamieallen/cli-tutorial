'use strict'
const commander = require('commander')
const sayHello = require('./sayHello.js')

// Configure commander with our app's version and description so it can
// respond to -V and -h with good stuff
commander
  .version('1.0.0')
  .description('A command line utility skeleton.')

// Configure commander with our one command, 'hello' which has a
// required 'name' parameter. The '.action' method tells commander what
// function to invoke to perform this command
commander
  .command('hello <name>')
  .alias('H')
  .description('Say hello')
  .action(name => sayHello(name))

// Finally, do it! Invoke commander with this process' command line
// arguments
commander.parse(process.argv)
