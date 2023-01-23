import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { User } from 'shared/types'
import { getCookie } from './utils'

interface AuthContextType {
  user: User | null
  fetching: boolean
  signin: (user: User, callback: VoidFunction) => void
  signout: (callback: VoidFunction) => void
}

const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [fetching, setFetching] = useState(!!getCookie('authenticated'))

  useEffect(() => {
    if (getCookie('authenticated')) {
      const onFetch = async () => {
        try {
          setFetching(true)
          const res = await fetch('/api/auth/user')
          if (!res.ok) {
            console.error(res)
            throw new Error('res not ok')
          }
          const json = await res.json()
          setUser(json as User)
        } catch (error) {
          console.error(error)
        } finally {
          setFetching(false)
        }
      }
      onFetch()
    }
  }, [])

  const signin = (newUser: User, callback: VoidFunction) => {
    setUser(newUser)
    callback()
  }

  const signout = (callback: VoidFunction) => {
    setUser(null)
    callback()
  }

  const value = { user, fetching, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

export function useAuthWithUser() {
  const { user, ...rest } = useContext(AuthContext)
  if (user === null) {
    throw new Error('user is null')
  }

  return { ...rest, user }
}
