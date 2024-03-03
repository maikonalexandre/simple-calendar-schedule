import { api } from '@/config/axios'

export interface UpdateEventBody {
  id: string
  date: Date
  description: string
  finalizedAt: Date
  name: string
  startedAt: Date
}

export const updateEvent = async ({
  id,
  date,
  description,
  finalizedAt,
  name,
  startedAt,
}: UpdateEventBody) => {
  const response = await api.patch('/events', {
    date,
    finalizedAt,
    description,
    name,
    startedAt,
    id,
  })
  return response
}
