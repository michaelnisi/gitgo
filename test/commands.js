var test = require('tap').test
  , fs = require('fs')
  , rimraf = require('rimraf')
  , join = require('path').join
  , dir = '/tmp/gitgo-' + Math.floor(Math.random() * (1<<24))
  , spawn = require('child_process').spawn
  , gitgo = require('../')
  , es = require('event-stream')
  , StringDecoder = require('string_decoder').StringDecoder

var decoder = new StringDecoder()
function dec(buf) {
  return decoder.write(buf)
}

function tt(opts, t) {
  var git = gitgo(dir, opts)
    , actual = []
  git.on('end', function () {
    t.is(actual.length, 1)
    t.end()
  })
  git.on('readable', function () {
    var chunk;
    while (null !== (chunk = git.read())) {
      actual.push(chunk)
    }
  })
}

test('setup', function (t) {
  fs.mkdirSync(dir, 0700)
  t.end()
})

test('not a git repository', function (t) {
  var git = gitgo(dir, ['pull'])
    , error = null
  git.on('end', function () {
    t.ok(error, 'should have caught error')
    t.end()
  })
  git.on('error', function (er) {
    error = er
  })
  git.on('readable', function () {
    while (null !== git.read()) {}
  })
})

test('git init', function (t) {
  tt(['init'], t)
})

test('git add (flowing)', function (t) {
  var filename = join(dir, 'hello.js')
  fs.writeFile(filename, 'console.log("Hello World!")', function (err) {
    var git = gitgo(dir, ['add', '.'])
    git.on('end', function () {
      t.ok(true, 'should be ok')
      t.end()
    })
    git.resume()
    t.equal(null, git.read(), 'should be null')
  })
})

test('commit (non-flowing)', function (t) {
  tt(['commit', '-m', 'Add hello file'], t)
})

test('log (flowing)', function (t) {
  var git = gitgo(dir, ['log'])
  git.pipe(es.writeArray(function (err, lines) {
    t.ok(lines.length, 'should have read something')
    t.end()
  }))
})

test('teardown', function (t) {
  rimraf(dir, function (err) {
    fs.stat(dir, function (err) {
      t.ok(!!err, 'should clean up after ourselves')
      t.end()
    })
  })
})
