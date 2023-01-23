import { useMemo } from 'react'
import { Months, Report as ReportType } from 'shared/types'
import { months, ReportTable } from '~/components/ReportTable'
import { PieGraph } from '~/components/ReportTable/Pie'
import { round } from '~/utils'

type NestedRecord = Record<
  string,
  Record<Months, number> & { coordination: string }
>

interface ReportProps {
  data: ReportType[]
}

const normalize = (data: ReportType[]) => {
  const byCoordination: NestedRecord = {}
  data.forEach(({ ust, coordination, month }) => {
    byCoordination[coordination] = byCoordination[coordination] ?? {
      coordination,
    }
    byCoordination[coordination][month] = ust
  })
  return Object.values(byCoordination)
}

export const Report = ({ data }: ReportProps) => {
  const byCoordination: NestedRecord = {}
  data.forEach(({ ust, coordination, month }) => {
    byCoordination[coordination] = byCoordination[coordination] ?? {
      coordination,
    }
    byCoordination[coordination][month] = ust
  })

  const data2 = normalize(data)
  const dataWithTotals = useMemo(
    () =>
      data2.map((row) => ({
        ...row,
        total: round(
          months.reduce((acc, val) => (row[`${val.label}`] ?? 0) + acc, 0)
        ),
      })),
    [data2]
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
