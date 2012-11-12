
// clone - clone gitgo repository

var gitgo = require('../index.js')
  , fs = require('fs')
  , repo = 'git://github.com/michaelnisi/troubled-www.git'
  , path = '/tmp/gitgo-' + Math.floor(Math.random() * (1<<24))

fs.mkdirSync(path)

gitgo(path, ['clone', repo])
  .on('error', function (err) {
    console.error(err)
  })
  .on('end', function () {
    console.log('OK')
  })
  .pipe(process.stdout)
