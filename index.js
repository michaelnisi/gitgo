
// gitgo - the stupid git wrapper

var Readable = require('stream').Readable
  , spawn = require('child_process').spawn

module.exports = function (path, opts, cb) {
  var ps = spawn('git', opts, { cwd: path })
    , stdout = ps.stdout
    , stderr = ps.stderr
    , stream = new Readable()

  ps.on('close', function () {
    stream.emit('close')
  })

  ps.on('exit', function () {
    ps.kill()
  })

  stdout.on('readable', function () {
    stream.read(0)
  })

  stdout.on('end', function () {
    stream.push(null)
  })

  stderr.on('data', function (chunk) {
    stream.emit('error', new Error(chunk))
  })

  stream._read = function (size) {
    var chunk = stdout.read()
    stream.push(chunk === null ? '' : chunk)
  }

  return stream
}
