import { NavLink, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  const onLogout = async () => {
    await fetch('/api/auth/logout')
    navigate('/login')
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

          <li>
            <button className={styles.logout} onClick={onLogout}>
              Sair
            </button>
          </li>
        </ol>
      </nav>
    </aside>
  )
}
