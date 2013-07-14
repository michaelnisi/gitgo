
// gitgo - the stupid git wrapper

var Readable = require('stream').Readable
  , spawn = require('child_process').spawn

module.exports = function (path, options, callback) {
  var ps = spawn('git', options, { cwd: path })
    , stream = new Readable()
    , err = null
    , source = ps.stdout

  function handleError(message) {
    err = new Error(message)
    stream.emit('error', err)
  }

  ps.on('exit', function (code) {
    if (!!code) {
      handleError(code)
    }

    ps.kill()
  })

  ps.on('close', function () {
    stream.push(null)
    if (callback) {
      callback(err)
    }
  })

  ps.stderr.on('data', handleError)

  source.on('data', function (chunk) {
    stream.push(chunk)
  })

  stream._read = function () {
    source.read()
  }

  return stream
}
