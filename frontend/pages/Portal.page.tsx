import { NavLink, Route, Routes } from 'react-router-dom'
import { useAuth2 } from '~/AuthProvider'
import { Macrocell } from './Macrocell.page'
import { ReportPage } from './Report.page'
import { SolicitationPage } from './Solicitation.page'

export const PortalPage = () => {
  const {
    user: { name, permissions },
  } = useAuth2()

  return (
    <div>
      <h1>Tela protegida do portal</h1>
      <p>Name: {name}</p>
      <p>Permissoes:</p>
      <ul>
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
      </ul>

      <Routes>
        <Route path="menu/relatorio" element={<ReportPage />} />
        <Route path="menu/solicitacao" element={<SolicitationPage />} />
        <Route path="menu/macrocelula" element={<Macrocell />} />
      </Routes>
    </div>
  )
}
