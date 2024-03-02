import { api } from '@/config/axios'

export interface ListEventsQuery {
  endDate: Date
  startedDate: Date
}

export const listEvents = async ({ endDate, startedDate }: ListEventsQuery) => {
  const { data } = await api.get('/events', {
    params: { endDate, startedDate },
  })
  return data
}
