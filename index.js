
// gitgo - the stupid git wrapper

module.exports = GitGo

function psopts (cwd) {
  return {
    cwd:cwd
  , env:process.env
  }
}

var util = require('util')
  , stream = require('stream')
  , child_process = require('child_process')

function GitGo (dir, opts) {
  if (!(this instanceof GitGo)) return new GitGo(dir, opts)
  stream.Readable.call(this)

  var ps = this.ps = child_process.spawn('git', opts, psopts(dir))
    , me = this

  ps.on('close', function () {
    me.push(null)
    me.emit('close')
  })

  function error (er) {
    me.emit('error', er)
  }
  ps.on('error', error)
  ps.stdout.on('error', error)
  ps.stderr.on('data', error)
}
util.inherits(GitGo, stream.Readable)

GitGo.prototype._read = function (size) {
  var stdout = this.stdout
    , me = this
  if (!stdout) {
    stdout = this.stdout = this.ps.stdout
    stdout.on('readable', function () {
      read()
    })
  }
  var ok = true
  function read (size) {
    var chunk
    while (ok && null !== (chunk = stdout.read(size))) {
      ok = me.push(chunk)
    }
    if (!ok) {
      me.once('drain', read)
    }
  }
}
