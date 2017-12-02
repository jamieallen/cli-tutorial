Build a command line utility using node.js and Commander.js
===========================================================
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This tutorial will show you how to quickly build a node.js based command line utility that accepts a small set commands and options and performs basic tasks. 

We will build a very basic command line app using [Commander.js](https://github.com/tj/commander.js/). It will accept one command with an optional parameter, and one option. The command will tell the app to say _Hello_, the option will tell it whether to beep or not when it says _Hello_.
# Initializing the node project
Create a project directory and initialized the project using `yarn init`. (You can use `npm` rather than `yarn` if you prefer.)
```bash
$ mkdir cli-tutorial
$ cd cli-tutorial
yarn init
```
Respond to the `yarn init` prompts as appropriate, or just hit return to accept the defaults. This creates and fills in the basic `package.json`.

We also need to get `commander.js`, the only dependency (other than node.js and Yarn).
```bash
$ yarn add commander
```
Let's take a quick look at the project `package.json` file so far.
```bash
$ cat package.json
{
  "name": "cli_app",
  "version": "1.0.0",
  "description": "A command line utility skeleton.",
  "main": "cli_app",
  "author": "Jamie Allen <jamie@jcallen.net>",
  "license": "MIT",
  "dependencies": {
    "commander": "^2.12.2"
  }
}
```
# Create the basic app
Now let's create the `cli_app` in our project directory.
```javascript
'use strict'
const commander = require('commander')
const sayHello = require('./sayHello.js')

// Configure Commander.js with our app's version and description so it can
// respond to -V and -h with good stuff
commander
  .version('1.0.0')
  .description('A command line utility skeleton.')

// Configure Commander.js with our one command, 'hello' which has a
// required 'name' parameter. The '.action' method tells Commander.js what
// function to invoke to perform this command
commander
  .command('hello <name>')
  .alias('H')
  .description('Say hello')
  .action(name => sayHello(name))

// Finally, do it! Invoke Commander.js with this process' command line
// arguments
commander.parse(process.argv)

```
`cli_app` is a very simple command interpreter. It accepts one custom command, __hello__ with a _name_ paramter, and invokes the `sayHello` function. If we try running it now, we will get the error _Cannot find module './sayHello.js'_. Let's add the `sayHello.js` module.
```javascript
'use strict'

const sayHello = (name) => {
  console.log('Hello ' + name)
}

// Export all methods
module.exports = sayHello

```
All this does is write a console log message. Let's run it.
```bash
$ node cli_app hello Jamie
Hi! Jamie
```
## Free functionality from Commander.js
We get a lot of functionality for free from Commander.js. For example:
```bash
$ node cli_app --version
1.0.0
```
```bash
$ node cli_app --help
$ node cli_app.js --help

  Usage: cli_app [options] [command]

  A command line utility skeleton.


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    hello|s <name>  Say hello
```
There are shorter aliases defined for the built in Commander.js options, for example: `-V` and `-h`. We defined a short alias for our __hello__ command, __H__. Try it.
```bash
$ node cli_app.js H Jamie
Hello Jamie
```
And we get error checking, for example, checking for required parameters.
```bash
$ node cli_app.js hello

  error: missing required argument `name'

```
# Required and optional parameters
Commander requires parameters defined with `<>` angle brackets. Parameters defined with `[]` square brackets are optional.
 
Let's change the _name_ parameter to be optional. In `cli_app.js` change
```javascript
.command('hello <name>')
 ```
 to
 ```javascript
.command('hello [name]')
```
Now Commander.js accepts our _sayHi_ command without a parameter.
```bash
$ node cli_app hello
Hi! undefined
```
But our `sayHello` function is writing the now undefined `name` variable to the console. 

Let's fix `sayHello.js` to check `name` before writing it to the console. We just need to change 
```javascript
console.log('Hello ' + name)
```
to 
```javascript
console.log('Hello ' + (name || ''))
```
Now it works with or without the _name_ parameter.
```bash
$ node cli_app hello
< .. >
```
```bash
$ node cli_app hello Jamie
< .. >

```
# References
1. This tutorial was inspired by Rowland Ekemezie's [Build An Interactive Command-Line Application with Node.js](https://scotch.io/tutorials/build-an-interactive-command-line-application-with-nodejs). Rowland's tutorial creates a little contact manager that uses the MongoDB database. I wanted something simpler to use as a starting point for little utilities that didn't need a database. If you need a database I suggest you start with Rowland's tutorial.
2. [Yarn](https://yarnpkg.com/en/) package manager.
3. Commander.js [npm page](https://www.npmjs.com/package/commander).
4. Commander.js [Readme.md](https://github.com/tj/commander.js/blob/master/Readme.md).
5. Commander.js [API documentation](http://tj.github.io/commander.js/).
6. [JavaScript Standard Style](https://standardjs.com/).