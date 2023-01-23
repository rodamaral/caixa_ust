import { useMemo } from 'react'
import { DataOmitTotal, months, ReportTable } from '~/components/ReportTable'
import { PieGraph } from '~/components/ReportTable/Pie'

const defaultData: DataOmitTotal[] = [
  {
    coordination: 'Coordenação 1',
    month1: 20,
    month2: 45,
    month3: 31,
    month4: 1,
    month5: 1,
    month6: 1,
    month7: 1,
    month8: 1,
    month9: 1,
    month10: 1,
    month11: 1,
    month12: 1,
  },
  {
    coordination: 'Coordenação 2',
    month1: 1,
    month2: 2,
    month3: 3,
    month4: 4,
    month5: 5,
    month6: 6,
    month7: 7,
    month8: 8,
    month9: 9,
    month10: 10,
    month11: 11,
    month12: 12,
  },
  {
    coordination: 'Terceira',
    month1: 1,
    month2: 0,
    month3: 4,
    month4: 5,
    month5: 1,
    month6: 2,
    month7: 4,
    month8: 8,
    month9: 13,
    month10: 17,
    month11: 22,
    month12: 33,
  },
]

export const ReportPage = () => {
  const data = useMemo(
    () =>
      defaultData.map((row) => ({
        ...row,
        total: months.reduce((acc, val) => (row[val.key] ?? 0) + acc, 0),
      })),
    [defaultData]
  )

  return (
    <div style={{ border: '2px solid red' }}>
      <h1>Relatório</h1>
      <div>
        <p>
          UST&apos;s solicitadas em cada mês - Matrix &quot;Coordenação x
          Mês&quot;
        </p>
        <ReportTable data={data} />
      </div>

      <div>
        <p>Quantitativo total por coordenação</p>
        <PieGraph data={data} />
      </div>
    </div>
  )
}
