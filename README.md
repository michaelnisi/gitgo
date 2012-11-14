# gitgo - the stupid git wrapper

[![Build Status](https://secure.travis-ci.org/michaelnisi/gitgo.png?branch=master)](https://travis-ci.org/michaelnisi/gitgo)

## Description

The gitgo [Node](http://nodejs.org/) module makes it easier to execute Git commands from Node. It simply wraps a child process into a readable Stream. 
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

## Signature

### gitgo(path, options, [callback])

Returns a readable Stream.

`options` is an array containing the git command to execute, followed by its options, e.g.

    ['add', '.']

The optional callback gets one argument `(err)`.

## Events

### Event:'error'
    function (err) {}

Emitted if there was an error.

### Event:'data'
    function (data) {}
    
Emits data from `stdout` and `stderr` of the child process.

### Event:'end'
    function () {}

Emitted when the execution of the git command ends.

## Installation

Install with [npm](http://npmjs.org/):

    npm install gitgo

## License

[MIT License](https://raw.github.com/michaelnisi/gitpull/master/LICENSE)
