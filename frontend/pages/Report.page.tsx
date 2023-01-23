import { Report } from '~/components/Report'
import { useFetch } from '~/hooks/useFetch'
import { Report as ReportInterface } from '../../shared/types'

type NestedRecord = Record<string, Record<string, number>>

export const ReportPage = () => {
  // const { data, loading, error } = useFetch<DataOmitTotal[]>(`/api/report`)
  const { data, loading, error } = useFetch<ReportInterface[]>(`/api/report`)
  console.log('data', data)

  if (loading) {
    return <h1>Loading</h1>
  }

  if (error || !data) {
    return <h1>Erro</h1>
  }

  const byMonth: NestedRecord = {}
  const byCoordination: NestedRecord = {}
  data.forEach(({ ust, coordination, month }) => {
    byMonth[month] = byMonth[month] ?? {}
    byMonth[month][coordination] = ust
    byCoordination[coordination] = byCoordination[coordination] ?? {}
    byCoordination[coordination][month] = ust
  })
  console.log('byMonth', byMonth)
  console.log('byCoordination', byCoordination)

  return <Report data={data} />
}
