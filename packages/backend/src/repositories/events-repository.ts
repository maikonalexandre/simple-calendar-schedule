import { Prisma, Event } from '@prisma/client'

export interface EventsRepository {
  create: (data: Prisma.EventCreateInput) => Promise<Event>
  findByDateInterval: (
    startedAt: Date,
    finalizedAd: Date,
  ) => Promise<Event | null>
}
