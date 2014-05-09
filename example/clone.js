
// clone - clone into 'gitgo'

var gitgo = require('../')
  , fs = require('fs')
  , repo = 'git://github.com/michaelnisi/gitgo.git'
  , path = '/tmp/gitgo-' + Math.floor(Math.random() * (1<<24))

fs.mkdirSync(path)

gitgo(path, ['clone', repo])
  .on('error', console.error)
  .pipe(process.stdout)
