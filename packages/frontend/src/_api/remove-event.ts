import { api } from '@/config/axios'

export interface removeEvent {
  id: string
}

export const deleteUser = async ({ id }: removeEvent) => {
  const response = await api.delete('/events', { data: { id } })
  return response
}
