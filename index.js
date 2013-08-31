
// gitgo - the stupid git wrapper

var Readable = require('stream').Readable
  , spawn = require('child_process').spawn

module.exports = function (path, opts) {
  var ps = spawn('git', opts, { cwd: path })
    , stdout = ps.stdout
    , stderr = ps.stderr
    , stream = new Readable()

  ps.on('close', function () {
    stream.push(null)
    stream.emit('close')
  })

  ps.on('exit', function () {
    ps.kill()
  })

  ps.on('error', function (err) {
    stream.emit(err)
  })

  stdout.on('readable', function () {
    stream.read(0)
  })

  stdout.on('error', function (err) {
    stream.emit(err)
  })

  stderr.on('data', function (chunk) {
    stream.emit('error', new Error(chunk))
  })

  stream._read = function (size) {
    var chunk = stdout.read(size)
    stream.push(chunk === null ? '' : chunk)
  }

  return stream
}
