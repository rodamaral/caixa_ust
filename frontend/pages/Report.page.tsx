import { DataOmitTotal } from 'shared/types'
import { Report } from '~/components/Report'
import { useFetch } from '~/hooks/useFetch'

export const ReportPage = () => {
  const { data, loading, error } = useFetch<DataOmitTotal[]>(`/api/report`)

  if (loading) {
    return <h1>Loading</h1>
  }

  if (error || !data) {
    return <h1>Erro</h1>
  }

  return <Report data={data} />
}
