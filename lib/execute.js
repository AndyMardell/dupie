/**
 * Execute
 * @module lib/execute
 */

const cmd = require('node-cmd')
const renderPie = require('./render-pie')
const prettyBytes = require('pretty-bytes')
const Spinner = require('cli-spinner').Spinner
var spinner = null

const df = (disk) => {
  spinner = new Spinner('Baking pie %s')
  spinner.start()
  cmd.get(
    'df -k | grep -E ' + disk,
    (err, data, stderr) => {
      if (err || typeof data === 'undefined' || data === '') {
        console.log('')
        console.log('Disk not found')
        console.log('')
        process.exit(1)
      }

      const dataArr = data.split(/\s+/)
      const used = parseInt(dataArr[2]) * 1000
      const free = parseInt(dataArr[3]) * 1000
      const result = [
        {
          label: 'Used ' + prettyBytes(used),
          value: used
        },
        {
          label: 'Free ' + prettyBytes(free),
          value: free
        }
      ]

      renderPie(result)
      spinner.stop()
    }
  )
}
exports.df = df

const du = (path, limit = 5) => {
  spinner = new Spinner('Baking pie %s')
  spinner.start()
  cmd.get(
    'du -d 1 -k ' + path + ' | sort -nr',
    (err, data, stderr) => {
      if (err || typeof data === 'undefined' || data === '') {
        console.log('')
        console.log('Directory not found')
        console.log('')
        process.exit(1)
      }

      const lines = data.split('\n')
      const totalSize = parseInt(lines[0]) * 1000
      const result = []
      const other = []

      for (let i = 1, len = lines.length; i < len; i++) {
        const line = lines[i].split('\t')
        const size = parseInt(line[0]) * 1000
        const name = line[1]
        const percentage = (size / totalSize) * 100

        if (typeof name !== 'undefined' && percentage >= limit) {
          result.push({
            label: name.split('/').pop() + ' ' + prettyBytes(size),
            value: size
          })
        } else if (percentage < 2) {
          other.push(size)
        }
      }

      const add = (a, b) => {
        return a + b
      }
      const otherSize = other.reduce(add, 0)

      result.push({
        label: 'Other ' + prettyBytes(otherSize),
        value: otherSize
      })

      renderPie(result)
      spinner.stop()
    }
  )
}
exports.du = du
