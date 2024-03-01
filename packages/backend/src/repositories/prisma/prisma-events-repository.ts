import { prisma } from '../../lib/prisma'
import { EventsRepository } from '../events-repository'

interface updateEventProps {
  id: string
  name: string
  date: Date
  startedAt: Date
  finalizedAt: Date
  description: string
  userId: string
}

interface createEventProps {
  name: string
  date: Date
  startedAt: Date
  finalizedAt: Date
  description: string
  userId: string
}

export class PrimaEventsRepository implements EventsRepository {
  async findByDateInterval({
    finalizedAt,
    startedAt,
    userId,
  }: {
    userId: string
    startedAt: Date
    finalizedAt: Date
  }) {
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

  async create(data: createEventProps) {
    const event = await prisma.event.create({ data })

    return event
  }

  async delete({ id, userId }: { id: string; userId: string }) {
    const event = await prisma.event.delete({
      where: {
        id,
        userId,
      },
    })
    return event
  }

  async findById({ id, userId }: { id: string; userId: string }) {
    const event = await prisma.event.findFirst({
      where: {
        id,
        userId,
      },
    })
    return event
  }

  async findAllByUserId({
    endDate,
    startedDate,
    userId,
  }: {
    userId: string
    startedDate: Date
    endDate: Date
  }) {
    const events = prisma.event.findMany({
      where: {
        userId,
        startedAt: {
          gte: startedDate,
          lte: endDate,
        },
      },
    })
    return events
  }

  async updateEvent(data: updateEventProps) {
    const event = prisma.event.update({
      where: {
        id: data.id,
        userId: data.userId,
      },
      data,
    })

    return event
  }
}
