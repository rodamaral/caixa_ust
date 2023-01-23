import { Cell, Pie, PieChart } from 'recharts'
import { Data } from 'shared/types'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const RADIAN = Math.PI / 180

interface Arg {
  cx: number
  cy: number
  name: string
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  index: number
}

const renderCustomizedLabel = ({
  cx,
  cy,
  name,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: Arg) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="#333"
      fontSize={12}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

interface PieGraphProps {
  data: Data[]
}

export const PieGraph = ({ data }: PieGraphProps) => {
  const totals = data.map((row) => ({
    name: row.coordination,
    value: row.total,
  }))

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={totals}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {totals.map((entry, index) => (
          <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  )
}
