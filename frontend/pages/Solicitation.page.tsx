import { Activity, Cell } from 'shared/types'
import { Solicitation } from '~/components/Solicitation/Solicitation'
import { useFetch } from '~/hooks/useFetch'

export const SolicitationPage = () => {
  const activities = useFetch<Activity[]>(`/api/activity`)
  const cells = useFetch<Cell[]>(`/api/macrocell`)

  if (activities.loading || cells.loading) {
    return <h1>Loading</h1>
  }

  if (activities.error || !activities.data || cells.error || !cells.data) {
    return <h1>Erro</h1>
  }

  return <Solicitation activities={activities.data} cells={cells.data} />
}
