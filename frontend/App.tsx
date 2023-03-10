import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useAuth } from './AuthProvider'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/Login.page'
import { PortalPage } from './pages/Portal.page'
import { SolicitationPage } from './pages/Solicitation.page'

export function App() {
  const { user, fetching } = useAuth()

  // TODO: loading indicator
  if (fetching) {
    return <h1>loading (undetermined)</h1>
  }

  return (
    <Routes>
      <Route
        index
        path="/*"
        element={
          <ProtectedRoute isAllowed={!!user}>
            <PortalPage />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<LoginPage />} />
      <Route
        path="menu/solicitacao"
        element={
          <ProtectedRoute isAllowed={!!user}>
            <Layout>
              <SolicitationPage />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
