import { Report } from '~/components/Report'
import { useFetch } from '~/hooks/useFetch'
import { Report as ReportInterface } from '../../shared/types'

export const ReportPage = () => {
  const { data, loading, error } = useFetch<ReportInterface[]>(`/api/report`)

  if (loading) {
    return <h1>Loading</h1>
  }

  if (error || !data) {
    return <h1>Erro</h1>
  }

  return <Report data={data} />
}
