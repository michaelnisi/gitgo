
// commit - record changes to the repository

var gitgo = require('../')
  , join = require('path').join
  , Writable = require('stream').Writable
  , fs = require('fs')
  , path = '/tmp/gitgo-' + Math.floor(Math.random() * (1<<24))
  , queue = [init, add, commit]

fs.mkdirSync(path)
next()

function next () {
  var fn = queue.shift()
  fn ? fn.apply() : console.log('ok')
}

function git (options) {
  var writer = new Writable()

  writer._write = function (chunk, encoding, callback) {
    console.log(chunk.toString())
    callback()
  }

  gitgo(path, options)
    .pipe(writer)
    .on('error', console.error)
    .on('finish', next)
}

function init () {
  git(['init'])
}

function add () {
  var filename = join(path, 'hello.js')
  fs.writeFile(filename, 'console.log("Hello World!")', function (err) {
    git(['add', '.'])
  })
}

function commit () {
  git(['commit', '-m', 'Add hello file'])
}
