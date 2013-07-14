# gitgo - the stupid git wrapper

[![Build Status](https://secure.travis-ci.org/michaelnisi/gitgo.png?branch=master)](https://travis-ci.org/michaelnisi/gitgo)

## Description

The gitgo [Node](http://nodejs.org/) module makes it easier to execute Git commands from Node. It simply wraps a child process into a readable Stream. 
## Usage

### Cloning a repo

    var gitgo = require('gitgo')
      , fs = require('fs')
      , repo = 'git://github.com/michaelnisi/gitgo.git'
      , path = '/tmp/gitgo-' + Math.floor(Math.random() * (1<<24))

    fs.mkdirSync(path)

    gitgo(path, ['clone', repo])
      .on('error', console.error)
      .pipe(process.stdout)

## gitgo(path, options, [callback])

The `gitgo` module exports a single function that returns a [Readable Stream](http://nodejs.org/api/stream.html#stream_class_stream_readable).

- `path` Directory path of the git repository

- `options` is an array containing the git command to execute, followed by its options, e.g.

    ['add', '.']

- `callback` Function Optional. Called when the child process closes.

## Installation

Install with [npm](http://npmjs.org/):

    npm install gitgo

## License

[MIT License](https://raw.github.com/michaelnisi/gitpull/master/LICENSE)
