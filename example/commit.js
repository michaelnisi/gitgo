// commit - record changes to the repository

var assert = require('assert')
var gitgo = require('../')
var join = require('path').join
var Writable = require('stream').Writable
var fs = require('fs')
var path = '/tmp/gitgo-' + Math.floor(Math.random() * (1 << 24))
var queue = [init, add, commit]

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
    assert.ifError(err)
    git(['add', '.'])
  })
}

function commit () {
  git(['commit', '-m', 'Add hello file'])
}
