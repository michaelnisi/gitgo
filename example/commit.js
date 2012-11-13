
// commit - record changes to the repository

var gitgo = require('gitgo')
  , join = require('path').join
  , fs = require('fs')
  , repo = 'git://github.com/michaelnisi/troubled-www.git'
  , path = '/tmp/gitgo-' + Math.floor(Math.random() * (1<<24))
  , queue = [init, add, commit]

fs.mkdirSync(path)
next()

function next () {
  var fn = queue.shift()
  fn ? fn.apply() : console.log('ok')
}

function git (options) {
  gitgo(path, options)
    .on('error', console.error)
    .on('end', next)
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
