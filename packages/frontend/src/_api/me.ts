import { api } from '@/config/axios'

export const me = async () => {
  const { data } = await api.get('/me')

  return data
}
