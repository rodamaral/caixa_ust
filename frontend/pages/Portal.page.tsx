import { Route, Routes } from 'react-router-dom'
import { useAuth2 } from '~/AuthProvider'
import { Aside } from '~/components/Aside'
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

      <div
        style={{
          // border: '4px solid blue',
          display: 'flex',
          justifyContent: 'flex-start',
          gap: 32,
        }}
      >
        <Aside permissions={permissions} />

        <main>
          <Routes>
            <Route path="menu/relatorio" element={<ReportPage />} />
            <Route path="menu/solicitacao" element={<SolicitationPage />} />
            <Route path="menu/macrocelula" element={<Macrocell />} />
            <Route path="menu/*" element={<Macrocell />} />
            <Route path="*" element={<Macrocell />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
