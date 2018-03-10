/**
 * Execute df
 * @module lib/execute-df
 */

const cmd = require('node-cmd')
const renderPie = require('./render-pie')

const executeDf = (disk) => {
  cmd.get(
    'df | grep -E ' + disk,
    (err, data, stderr) => {
      if (err || typeof data === 'undefined' || data === '') {
        console.error(err)
        process.exit(1)
      }

      const dataArr = data.split(/\s+/)
      const used = parseInt(dataArr[4].replace('%', ''))
      const free = 100 - used
      const result = [
        {
          label: 'Used',
          value: used
        },
        {
          label: 'Free',
          value: free
        }
      ]

      renderPie(result)
    }
  )
}
module.exports = executeDf
