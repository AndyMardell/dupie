const Pie = require('cli-pie')

const renderPie = (info) => {
  const df = new Pie(10, info,
    {
      legend: true
    }
  )

  console.log(df.toString())
}
module.exports = renderPie
