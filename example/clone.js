
// clone - clone gitgo repository

var gitgo = require('gitgo')
  , fs = require('fs')
  , repo = 'git://github.com/michaelnisi/troubled-www.git'
  , path = '/tmp/gitgo-' + Math.floor(Math.random() * (1<<24))

fs.mkdirSync(path)

gitgo(path, ['clone', repo])
  .on('error', console.error)
  .on('end', console.log)
  .pipe(process.stdout)
