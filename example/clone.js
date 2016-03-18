// clone - clone into 'gitgo'

var gitgo = require('../')
var fs = require('fs')
var repo = 'git://github.com/michaelnisi/gitgo.git'
var path = '/tmp/gitgo-' + Math.floor(Math.random() * (1 << 24))

fs.mkdirSync(path)

gitgo(path, ['clone', repo])
  .on('error', console.error)
  .pipe(process.stdout)
