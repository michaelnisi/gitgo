
// gitgo - the stupid git wrapper

module.exports = GitGo

function psopts (cwd) {
  return {
    cwd:cwd
  , env:process.env
  }
}

var child_process = require('child_process')

function spawn (stream) {
  var dir = stream.dir
    , opts = stream.opts
    , ps = child_process.spawn('git', opts, psopts(dir))
  ps.on('close', function () {
    stream.push(null)
    stream.emit('close')
  })
  function error (er) {
    stream.emit('error', er)
  }
  ps.on('error', error)
  ps.stdout.on('error', error)
  ps.stdout.pipe(stream)
  ps.stderr.pipe(stream) // reading non-error stuff here too
  return ps
}

var util = require('util')
  , stream = require('stream')

function GitGo (dir, opts) {
  if (!(this instanceof GitGo)) return new GitGo(dir, opts)
  stream.Transform.call(this)
  this.dir = dir
  this.opts = opts
  spawn(this)
}
util.inherits(GitGo, stream.Transform)

var StringDecoder = require('string_decoder').StringDecoder

function error (chunk) {
  var str = new StringDecoder().write(chunk)
  return str.split(' ')[0] === 'fatal:' ? new Error(str) : null
}

GitGo.prototype._transform = function (chunk, enc, cb) {
  var er = error(chunk)
  if (er) this.emit('error', er)
  this.push(chunk)
  cb()
}
