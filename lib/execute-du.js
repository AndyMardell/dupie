/**
 * Execute du
 * @module lib/execute-du
 */

const cmd = require('node-cmd')
const renderPie = require('./render-pie')

const executeDu = (path) => {
  cmd.get(
    'du -d 1 ' + path + ' | sort -nr',
    (err, data, stderr) => {
      if (err || typeof data === 'undefined' || data === '') {
        console.error(err)
        process.exit(1)
      }

      const lines = data.split('\n')
      const totalSize = parseInt(lines[0])
      const result = []

      for (let i = 1, len = lines.length; i < len; i++) {
        const line = lines[i].split('\t')
        const size = parseInt(line[0])
        const name = line[1]
        const percentage = (size / totalSize) * 100

        if (percentage > 2) {
          result.push({
            label: name,
            value: size
          })
        }
      }

      renderPie(result)
    }
  )
}
module.exports = executeDu
