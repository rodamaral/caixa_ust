import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getCookie } from './utils'

/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true
    setTimeout(callback, 100) // fake async
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false
    setTimeout(callback, 100)
  },
}

interface User {
  name: string
  permissions: string[]
}

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
    console.info(
      'AuthProvider effect',
      getCookie('authenticated'),
      getCookie('name.subname')
    )
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
    return fakeAuthProvider.signin(() => {
      console.log('signin', newUser)
      setUser(newUser)
      callback()
    })
  }

  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null)
      callback()
    })
  }

  const value = { user, fetching, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
