const cmd = require('node-cmd')
const Pie = require('cli-pie')

const executeDf = async (disk) => {
  cmd.get(
    'df | grep -E ' + disk,
    (err, data, stderr) => {
      if (err || typeof data === 'undefined' || data === '') {
        console.log('Disk not found')
        process.exit(1)
      }

      const dataArr = data.split(/\s+/)
      const used = parseInt(dataArr[4].replace('%', ''))
      const free = 100 - used
      const df = new Pie(10, [
        {
          label: 'Used',
          value: used,
          color: [237, 115, 85]
        },
        {
          label: 'Free',
          value: free,
          color: [183, 183, 183]
        }
      ],
      {
        legend: true
      })

      console.log(df.toString())
      process.exit(1)
    }
  )
}
module.exports = executeDf
