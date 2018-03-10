#!/usr/bin/env node

const program = require('commander')
const execute = require('./lib/execute')
let dir

program
  .usage('<dir>')
  .description('If no argument is given, will show a chart for the current directory')
  .arguments('<dir>')
  .action(dirPath => {
    dir = dirPath
  })
  .on('--help', () => {
    console.log('')
    console.log('  Examples:')
    console.log('')
    console.log('    $ dupie')
    console.log('    $ dupie ~')
    console.log('    $ dupie /path/to/dir')
    console.log('    $ dupie disk')
    console.log('    $ dupie disk1s1')
    console.log('')
  })
  .parse(process.argv)

dir = (typeof dir === 'undefined' ? '' : dir)

if (dir && dir.substring(0, 4) === 'disk') {
  execute.df(dir)
} else {
  execute.du(dir)
}
