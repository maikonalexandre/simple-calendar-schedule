import { addHours } from 'date-fns'

export type EventDto = {
  description: string
  start: Date
  end: Date
  id?: string
  userId?: string
}

export const weekends = [
  {
    eventos: [
      {
        description: 'andar de carro',
        start: new Date(),
        end: addHours(new Date(), 2),
        id: 'lkjdflajkdsf',
      },
      {
        description: 'ir ao mercado ',
        start: new Date(),
        end: addHours(new Date(), 2),
        id: 'lkjdflajkdsf',
      },
      {
        description: 'passear como meu cavalo',
        start: addHours(new Date(), 30),
        end: addHours(new Date(), 34),
        id: 'hdfdj',
      },

      {
        description: 'andar de treno como meu cavalo',
        start: addHours(new Date(), 30),
        end: addHours(new Date(), 34),
        id: 'hdffafdadj',
      },
    ],
  },
  {
    eventos: [
      {
        description: 'andar de treno como meu cavalo',
        start: addHours(new Date(), 30),
        end: addHours(new Date(), 34),
        id: 'hdffafdadj',
      },
    ],
  },
  {},
  {},
  {},
  {},
  {},
]
