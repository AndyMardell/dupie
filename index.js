#!/usr/bin/env node

const program = require('commander')
const execute = require('./lib/execute')
const pjson = require('./package.json')
let dir

program
  .version(pjson.version)
  .usage('[options] <dir>')
  .description('If no directory is given, dupie will show a chart for the current directory')
  .option('-L, --limit <n>', 'Lower percentage limit for grouping as "Other" [default is 5]', parseInt)
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
    console.log('    $ dupie -L 1 /var/www')
    console.log('    $ dupie disk')
    console.log('    $ dupie disk1s1')
    console.log('')
  })
  .parse(process.argv)

dir = (typeof dir === 'undefined' ? '' : dir)

if (dir && dir.substring(0, 4) === 'disk') {
  execute.df(dir)
} else {
  execute.du(dir, program.limit)
}
