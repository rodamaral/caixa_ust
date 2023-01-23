import { NavLink } from 'react-router-dom'
import { User } from 'shared/types'
import styles from './Aside.module.scss'

interface AsideProps {
  permissions: User['permissions']
}

export const Aside = ({ permissions }: AsideProps) => {
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
                menu/{permission}
              </NavLink>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  )
}
