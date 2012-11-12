# gitgo - execute git commands

[![Build Status](https://secure.travis-ci.org/michaelnisi/gitgo.png)](http://travis-ci.org/michaelnisi/gitgo)

## Description

The gitgo Node module lets you execute git commands.

## Usage

### Stream

    var gitgo = require('gitgo')

    gitpull('.')
      .on('error', function (err) {
        console.error(err.message)
      })
      .on('end', function () {
        console.log('OK')
      })

### Callback
    
    var gitpull = require('gitpull')

    gitpull('.', function (err) {
      err ? console.error(err.message) : console.log('OK')  
    })

## Installation

install via [npm](http://npmjs.org/):

    npm install gitgo

## License

[MIT License](https://raw.github.com/michaelnisi/gitpull/master/LICENSE)
