import { api } from '@/config/axios'

export interface RegisterBody {
  email: string
  password: string
  name: string
}

export const registerUser = async ({ email, password, name }: RegisterBody) => {
  const response = await api.post('/users', { email, password, name })
  return response
}
