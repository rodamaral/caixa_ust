import { Navigate } from 'react-router-dom'

export interface ProtectedRouteProps {
  isAllowed: boolean
  redirectPath?: string
  children?: JSX.Element | JSX.Element[]
}

export const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/login',
  children,
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />
  }

  return children != undefined ? <>{children}</> : <h1>OUTLET TODO</h1>
}
