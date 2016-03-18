var assert = require('assert')
var test = require('tap').test
var fs = require('fs')
var rimraf = require('rimraf')
var join = require('path').join
var dir = '/tmp/gitgo-' + Math.floor(Math.random() * (1 << 24))
var gitgo = require('../')
var es = require('event-stream')

test('setup', function (t) {
  t.plan(1)
  fs.mkdirSync(dir)
  t.ok(fs.statSync(dir).isDirectory())
  t.end()
})

test('not a git repository', function (t) {
  t.plan(1)
  var git = gitgo(dir, ['pull'])
  var error
  git.on('end', function () {
    t.ok(error, 'should error')
    t.end()
  })
  git.on('error', function (er) {
    error = er
  })
  git.on('readable', function () {
    while (git.read() !== null) {}
  })
})

function tt (opts, t) {
  var git = gitgo(dir, opts)
  var actual = []
  git.on('end', function () {
    t.is(actual.length, 1)
    t.end()
  })
  git.on('readable', function () {
    var chunk
    while ((chunk = git.read()) !== null) {
      actual.push(chunk)
    }
  })
}

test('git init', function (t) {
  tt(['init'], t)
})

function write (name, str, cb) {
  var filename = join(dir, name)
  fs.writeFile(filename, str, function (er) {
    cb(er)
  })
}

test('git add (flowing)', function (t) {
  write('hello.js', 'console.log("Hello World!")', function (er) {
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
    assert.ifError(err)
    t.ok(lines.length, 'should have read something')
    t.end()
  }))
})

test('teardown', function (t) {
  rimraf(dir, function (err) {
    assert.ifError(err)
    fs.stat(dir, function (err) {
      t.ok(!!err, 'should clean up after ourselves')
      t.end()
    })
  })
})

