import { api } from '@/config/axios'

export interface CreateEventBody {
  date: Date
  description: string
  finalizedAt: Date
  name: string
  startedAt: Date
}

export const createEvent = async ({
  date,
  description,
  finalizedAt,
  name,
  startedAt,
}: CreateEventBody) => {
  const response = await api.post('/events', {
    date,
    finalizedAt,
    description,
    name,
    startedAt,
  })
  return response
}
