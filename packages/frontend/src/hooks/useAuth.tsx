import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { logIn } from '@/_api/login'
import { me } from '@/_api/me'
import { queryClient } from '@/config/react-query'

type User = {
  email: string
  name: string
}

interface AuthContextProps {
  user: User | null
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
  isLoading: boolean
  loadContext: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    const data = await logIn({ email, password }).finally(() => {
      setIsLoading(false)
    })

    if (data.user && data.token) {
      setUser(data.user)
      localStorage.setItem('authToken', data.token)
      return true
    }

    return false
  }

  const signOut = async () => {
    setUser(null)
    queryClient.clear()
    localStorage.clear()
  }

  const loadContext = async () => {
    setIsLoading(true)
    const token = localStorage.getItem('authToken')

    if (token) {
      try {
        const data = await me()
        setUser(data.user)
      } catch (error) {
        console.log(error)
      }
    }

    setIsLoading(false)
  }

  useEffect(() => {
    loadContext()
  }, [])

  return (
    <AuthContext.Provider
      value={{ signIn, user, signOut, isLoading, loadContext }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
