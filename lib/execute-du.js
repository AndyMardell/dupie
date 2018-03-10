const cmd = require('node-cmd')
const Pie = require('cli-pie')

const executeDu = async (path) => {
  cmd.get(
    'du -d 1 ' + path + ' | sort -nr',
    (err, data, stderr) => {
      if (err || typeof data === 'undefined' || data === '') {
        console.log('Directory not found')
        process.exit(1)
      }

      const lines = data.split('\n')
      const totalSize = parseInt(lines[0])

      const du = new Pie(10, [], {
        legend: true
      })

      for (let i = 1, len = lines.length; i < len; i++) {
        const line = lines[i].split('\t')
        const size = parseInt(line[0])
        const name = line[1]
        const percentage = (size / totalSize) * 100

        if (percentage > 2) {
          du.add({
            label: name,
            value: size
          })
        }
      }

      console.log(du.toString())
    }
  )
}
module.exports = executeDu
