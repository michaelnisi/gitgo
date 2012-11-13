# gitgo - the stupid git wrapper

[![Build Status](https://secure.travis-ci.org/michaelnisi/gitgo.png?branch=master)](https://travis-ci.org/michaelnisi/gitgo)

## Description

The gitgo [Node](http://nodejs.org/) module lets you execute git commands. It is a simple wrapper that accepts an options array with a git command and arguments.

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

### gitgo(path, [command, args, …])

gitgo expects a path and an array. The first item of the array is a git command, all remaining items are arguments for the command.

## Events

### Event:'error'
    function (err) {}

Emitted if there was an error receiving data.

### Event:'data'
    function (data) {}
    
Emits data from `stdout` and `stderr`.

### Event:'end'
    function () {}

Emitted when the execution of the git command ends.

## Installation

install via [npm](http://npmjs.org/):

    npm install gitgo

## License

[MIT License](https://raw.github.com/michaelnisi/gitpull/master/LICENSE)
