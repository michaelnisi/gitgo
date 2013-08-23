var test = require('tap').test
  , fs = require('fs')
  , rimraf = require('rimraf')
  , join = require('path').join
  , dir = '/tmp/gitgo-' + Math.floor(Math.random() * (1<<24))
  , spawn = require('child_process').spawn
  , gitgo = require('../')
  , es = require('event-stream')

test('setup', function (t) {
  fs.mkdirSync(dir, 0700)
  t.end()
})

test('not a git repository', function (t) {
  var git = gitgo(dir, ['pull'])

  git.on('end', function () {
    t.ok(error, 'should have caught error')
    t.end()
  })

  var error
  git.on('error', function (er) {
    error = er
  })

  git.on('readable', function () {
    t.ok(git.read(), 'should not be null')
  })
})

test('git init', function (t) {
  var git = gitgo(dir, ['init'])

  git.on('end', function () {
    t.ok(true, 'should be ok')
    t.end()
  })

  git.on('readable', function () {
    t.ok(git.read(), 'should not be null')
  })
})

test('git add', function (t) {
  var filename = join(dir, 'hello.js')
  fs.writeFile(filename, 'console.log("Hello World!")', function (err) {
    var git = gitgo(dir, ['add', '.'])

    git.on('end', function () {
      t.ok(true, 'should be ok')
      t.end()
    })

    t.equal(null, git.read(), 'should be null')
  })
})

test('commit (non-flowing)', function (t) {
  var git = gitgo(dir, ['commit', '-m', 'Add hello file'])

  var found = []
  git.on('end', function () {
    t.ok(found.length, 'should have read something')
    t.end()
  })

  var count = 0
  git.on('readable', function () {
    var chunk
    while (null !== (chunk = git.read())) {
      found.push(chunk)
    }
  })
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
