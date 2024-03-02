import { api } from '@/config/axios'

export interface LoginBody {
  email: string
  password: string
}

export const logIn = async ({ email, password }: LoginBody) => {
  const { data } = await api.post('/sessions', { email, password })
  return data
}
