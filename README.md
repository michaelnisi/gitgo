# gitgo - the stupid git wrapper

The `gitgo` [Node](http://nodejs.org/) module makes it slightly easier to execute [Git](http://git-scm.com/) commands from Node. It's a one-off function that spawns a child process to run the Git command, returning a readable stream to expose feedback from Git.

[![Build Status](https://secure.travis-ci.org/michaelnisi/gitgo.png?branch=master)](https://travis-ci.org/michaelnisi/gitgo)

## Usage

### Cloning a repo

```js
var gitgo = require('gitgo')
var fs = require('fs')
var repo = 'git://github.com/michaelnisi/gitgo.git'
var path = '/tmp/gitgo-' + Math.floor(Math.random() * (1 << 24))

fs.mkdirSync(path)
gitgo(path, ['clone', repo]).pipe(process.stdout)
```

## API

### gitgo(path, opts)

- `path` Directory path to target repo
- `opts` Array containing the git command to execute, followed by its options, e.g. `['add', '.']`

The `gitgo` module exports a single function that returns a [Readable Stream](http://nodejs.org/api/stream.html#stream_class_stream_readable).

## Installation

```
% npm install pickup
```

## License

[MIT License](https://raw.github.com/michaelnisi/gitgo/master/LICENSE)
