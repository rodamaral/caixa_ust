import { NavLink, useLocation } from 'react-router-dom'
import { useAuthWithUser } from '~/AuthProvider'
import styles from './Aside.module.scss'

const labels: Record<string, string> = {
  relatorio: 'Relatório',
  solicitacao: 'Solicitação UST',
  macrocelula: 'Macrocélula',
}

export const Aside = () => {
  const {
    user: { permissions },
  } = useAuthWithUser()
  const location = useLocation()
  // const params = useParams()
  // console.log('location', location)
  // console.log('params', params)

  if (location.pathname === '/menu/solicitacao') {
    return null
  }

  return (
    <aside className={styles.aside}>
      <nav>
        <ol>
          {permissions.map((permission) => (
            <li key={permission}>
              <NavLink
                to={`menu/${permission}`}
                className={({ isActive, isPending }) =>
                  isActive ? 'active' : isPending ? 'pending' : ''
                }
              >
                {labels[permission]}
              </NavLink>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  )
}
