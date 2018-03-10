#!/usr/bin/env node

const program = require('commander')
const executeDu = require('./lib/execute-du')
const executeDf = require('./lib/execute-df')
let dir

program
  .usage('<dir>')
  .description('If no argument is given, will show a chart for the current directory\n\n  Alternative usage:\n\n  dupie disk - show current disk usage\n  dupie <diskn> - show specific disk usage')
  .arguments('<dir>')
  .action(dirPath => {
    dir = dirPath
  })
  .parse(process.argv)

if (typeof dir === 'undefined' || dir.substring(0, 4) !== 'disk') {
  const path = (typeof dir === 'undefined' ? '' : dir)
  executeDu(path)
} else {
  executeDf(dir)
}
