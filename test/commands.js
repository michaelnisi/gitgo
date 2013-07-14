var test = require('tap').test
  , fs = require('fs')
  , rimraf = require('rimraf')
  , join = require('path').join
  , dir = '/tmp/gitgo-' + Math.floor(Math.random() * (1<<24))
  , spawn = require('child_process').spawn
  , git = require('../')

test('setup', function (t) {
  fs.mkdirSync(dir, 0700)
  t.end()
})

test('not a git repository', function (t) {
  var errors = []

  var s = git(dir)
    .on('error', function (err) {
      errors.push(err)
    })
    .on('end', function () {
      t.ok(errors.length, 'should contain errors')
      t.end()
    })
    .on('readable', function () {
      s.read()
    })
})

test('git init', function (t) {
  var s = git(dir, ['init'])
    .on('error', t.fail)
    .on('end', function () {
      t.ok(true, 'should be ok')
      t.end()
    })
    .on('readable', function () {
      s.read()
    })
})

test('git add', function (t) {
  var filename = join(dir, 'hello.js')

  fs.writeFile(filename, 'console.log("Hello World!")', function (err) {
     var s = git(dir, ['add', '.'])
      .on('error', t.fail)
      .on('end', function () {
        t.ok(true, 'should be ok')
        t.end()
      })
      .on('readable', function () {
        s.read()
      })
  })
})

test('commit', function (t) {
  var s = git(dir, ['commit', '-m', 'Add hello file'])
    .on('error', t.fail)
    .on('end', function () {
      t.ok(true, 'should be ok')
      t.end()
    })
    .on('readable', function () {
      s.read()
    })
})

test('failed push', function (t) {
  var errors = []

  var s = git(dir, ['push'])
    .on('error', function (err) {
      errors.push(err)
    })
    .on('end', function () {
      t.ok(errors.length > 0, 'should contain errors')
      t.end()
    })
    .on('readable', function () {
      s.read()
    })
})

test('teardown', function (t) {
  rimraf(dir, function (err) {
    fs.stat(dir, function (err) {
      t.ok(!!err, 'should error')
      t.end()
    })
  })
})
