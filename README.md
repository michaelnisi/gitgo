# gitgo - the stupid git wrapper

[![Build Status](https://secure.travis-ci.org/michaelnisi/gitgo.png?branch=master)](https://travis-ci.org/michaelnisi/gitgo)


## Description

The gitgo [Node](http://nodejs.org/) module makes it slightly easier to execute Git commands from Node. It's a one-off function that spawns a child process to run the Git command, returning a readable stream to expose feedback from git.

## Usage

### Cloning a repo

    var gitgo = require('gitgo')
      , fs = require('fs')
      , repo = 'git://github.com/michaelnisi/gitgo.git'
      , path = '/tmp/gitgo-' + Math.floor(Math.random() * (1<<24))

    fs.mkdirSync(path)

    gitgo(path, ['clone', repo]).pipe(process.stdout)

## gitgo(path, options, [callback])

The `gitgo` module exports a single function that returns a [Readable Stream](http://nodejs.org/api/stream.html#stream_class_stream_readable).

- `path` Directory path to target repo

- `options` Array containing the git command to execute, followed by its options, e.g. `['add', '.']`

- `callback` Function Optional. Called when the child process closes.

## Installation

With [npm](http://npmjs.org) do:

    npm install gitgo

[![NPM](https://nodei.co/npm/gitgo.png)](https://npmjs.org/package/gitgo)

## License

[MIT License](https://raw.github.com/michaelnisi/gitpull/master/LICENSE)
