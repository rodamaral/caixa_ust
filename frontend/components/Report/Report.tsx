import { useMemo } from 'react'
import { DataOmitTotal } from 'shared/types'
import { months, ReportTable } from '~/components/ReportTable'
import { PieGraph } from '~/components/ReportTable/Pie'

interface ReportProps {
  data: DataOmitTotal[]
}

export const Report = ({ data }: ReportProps) => {
  const dataWithTotals = useMemo(
    () =>
      data.map((row) => ({
        ...row,
        total: months.reduce((acc, val) => (row[val.key] ?? 0) + acc, 0),
      })),
    [data]
  )

  return (
    <div style={{ border: '2px solid red' }}>
      <h1>Relatório</h1>
      <div>
        <p>
          UST&apos;s solicitadas em cada mês - Matrix &quot;Coordenação x
          Mês&quot;
        </p>
        <ReportTable data={dataWithTotals} />
      </div>

      <div>
        <p>Quantitativo total por coordenação</p>
        <PieGraph data={dataWithTotals} />
      </div>
    </div>
  )
}
