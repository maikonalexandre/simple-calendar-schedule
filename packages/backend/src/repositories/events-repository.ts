import { Prisma, Event } from '@prisma/client'

export interface EventsRepository {
  create: (data: Prisma.EventCreateInput) => Promise<Event>
  findByDateInterval: (
    userId: string,
    startedAt: Date,
    finalizedAt: Date,
  ) => Promise<Event | null>
  delete: (id: string, userId: string) => Promise<Event | null>
  findById: (id: string, userId: string) => Promise<Event | null>
}
