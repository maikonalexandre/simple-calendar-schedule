import { addHours } from 'date-fns'

export type EventDto = {
  description: string
  start: Date
  end: Date
  id?: string
  userId?: string
}

export type EventsDto = {
  dayOfTheWeek: number
  events: EventDto[]
}[]

export const events: EventsDto = [
  {
    dayOfTheWeek: 28,
    events: [
      {
        description: 'andar de carro',
        start: new Date(),
        end: addHours(new Date(), 2),
        id: 'lkjdflajkdsf',
      },
    ],
  },
]
