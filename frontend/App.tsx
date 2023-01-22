import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useAuth } from './AuthProvider'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/Login.page'
import { PortalPage } from './pages/Portal.page'

export function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route
        index
        element={
          <ProtectedRoute isAllowed={!!user}>
            <PortalPage />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<LoginPage />} />
    </Routes>
  )
}
