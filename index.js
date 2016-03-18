// gitgo - the stupid git wrapper

module.exports = GitGo

var StringDecoder = require('string_decoder').StringDecoder
var child_process = require('child_process')
var stream = require('readable-stream')
var util = require('util')

function psopts (cwd) {
  return {
    cwd: cwd,
    env: process.env
  }
}

function spawn (s) {
  var dir = s.dir
  var opts = s.opts
  var ps = child_process.spawn('git', opts, psopts(dir))

  ps.on('close', function () {
    s.push(null)
    s.emit('close')
  })
  function error (er) {
    s.emit('error', er)
  }
  ps.on('error', error)
  ps.stdout.on('error', error)
  ps.stdout.pipe(s)
  ps.stderr.pipe(s) // reading non-error stuff here too
  return ps
}

function GitGo (dir, opts) {
  if (!(this instanceof GitGo)) return new GitGo(dir, opts)
  stream.Transform.call(this)
  this.dir = dir
  this.opts = opts
  this.decoder = new StringDecoder(opts.encoding)
  spawn(this)
}

util.inherits(GitGo, stream.Transform)

function error (chunk, decoder) {
  decoder = decoder || new StringDecoder()
  var str = decoder.write(chunk)
  return str.split(' ')[0] === 'fatal:' ? new Error(str) : null
}

GitGo.prototype._transform = function (chunk, enc, cb) {
  var er = error(chunk, this.decoder)
  if (er) this.emit('error', er)
  this.push(chunk)
  cb()
}
