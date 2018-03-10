/**
 * Execute
 * @module lib/execute
 */

const cmd = require('node-cmd')
const renderPie = require('./render-pie')

const df = (disk) => {
  cmd.get(
    'df | grep -E ' + disk,
    (err, data, stderr) => {
      if (err || typeof data === 'undefined' || data === '') {
        console.log('')
        console.log('Disk not found')
        console.log('')
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
exports.df = df

const du = (path) => {
  cmd.get(
    'du -d 1 ' + path + ' | sort -nr',
    (err, data, stderr) => {
      if (err || typeof data === 'undefined' || data === '') {
        console.log('')
        console.log('Directory not found')
        console.log('')
        process.exit(1)
      }

      const lines = data.split('\n')
      const totalSize = parseInt(lines[0])
      const result = []
      const other = []

      for (let i = 1, len = lines.length; i < len; i++) {
        const line = lines[i].split('\t')
        const size = parseInt(line[0])
        const name = line[1]
        const percentage = (size / totalSize) * 100

        if (typeof name !== 'undefined' && percentage >= 2) {
          result.push({
            label: name.split('/').pop(),
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
        label: 'Other',
        value: otherSize
      })

      renderPie(result)
    }
  )
}
exports.du = du
