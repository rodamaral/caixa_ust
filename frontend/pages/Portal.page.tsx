import { Route, Routes } from 'react-router-dom'
import { Aside } from '~/components/Aside'
import { Layout } from '~/components/Layout'
import { Macrocell } from './Macrocell.page'
import { ReportPage } from './Report.page'

export const PortalPage = () => (
  <Layout>
    <Aside />

    <main>
      <Routes>
        <Route path="menu/relatorio" element={<ReportPage />} />
        <Route path="menu/macrocelula" element={<Macrocell />} />
        <Route path="menu/*" element={<Macrocell />} />
        <Route path="*" element={<ReportPage />} />
      </Routes>
    </main>
  </Layout>
)
