# gitgo - execute git commands

[![Build Status](https://secure.travis-ci.org/michaelnisi/gitgo.png)](http://travis-ci.org/michaelnisi/gitgo)

## Description

The gitgo Node module lets you execute git commands.

## Usage

### Clone a repository

    var gitgo = require('gitgo')
      , fs = require('fs')
      , repo = 'git://github.com/michaelnisi/gitgo.git'
      , path = '/tmp/gitgo-' + Math.floor(Math.random() * (1<<24))

    fs.mkdirSync(path)

    gitgo(path, ['clone', repo])
      .on('error', console.error)
      .on('end', console.log)
      .pipe(process.stdout)

## Installation

install via [npm](http://npmjs.org/):

    npm install gitgo

## License

[MIT License](https://raw.github.com/michaelnisi/gitpull/master/LICENSE)
