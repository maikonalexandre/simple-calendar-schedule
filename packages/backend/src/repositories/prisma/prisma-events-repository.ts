import { prisma } from '../../lib/prisma'
import { Prisma } from '@prisma/client'
import { EventsRepository } from '../events-repository'

export class PrimaEventsRepository implements EventsRepository {
  async findByDateInterval(startedAt: Date, finalizedAd: Date) {
    const event = await prisma.event.findFirst({
      where: {
        startedAt: {
          gte: startedAt,
          lte: finalizedAd,
        },
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
}
