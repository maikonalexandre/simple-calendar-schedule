import { prisma } from '../../lib/prisma'
import { Prisma } from '@prisma/client'
import { EventsRepository } from '../events-repository'

export class PrimaEventsRepository implements EventsRepository {
  async findByDateInterval(userId: string, startedAt: Date, finalizedAt: Date) {
    const event = await prisma.event.findFirst({
      where: {
        userId,
        OR: [
          {
            AND: [
              { startedAt: { lte: startedAt } },
              { finalizedAt: { gte: startedAt } },
            ],
          },
          {
            AND: [
              { startedAt: { lte: finalizedAt } },
              { finalizedAt: { gte: finalizedAt } },
            ],
          },
          {
            AND: [
              { startedAt: { gte: startedAt } },
              { finalizedAt: { lte: finalizedAt } },
            ],
          },
        ],
      },
    })

    return event
  }

  async create(data: Prisma.EventCreateInput) {
    const event = await prisma.event.create({
      data,
    })

    return event
  }

  async delete(id: string, userId: string) {
    const event = await prisma.event.delete({
      where: {
        id,
        userId,
      },
    })
    return event
  }

  async findById(id: string, userId: string) {
    const event = await prisma.event.findFirst({
      where: {
        id,
        userId,
      },
    })
    return event
  }
}
