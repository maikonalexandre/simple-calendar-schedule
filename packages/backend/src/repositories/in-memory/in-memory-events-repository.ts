import { Event } from '@prisma/client'
import { EventsRepository } from '../events-repository'

interface createEventProps {
  name: string
  date: Date
  startedAt: Date
  finalizedAt: Date
  description: string
  userId: string
}

interface updateEventProps {
  id: string
  name: string
  date: Date
  startedAt: Date
  finalizedAt: Date
  description: string
  userId: string
}

export class InMemoryEventsRepository implements EventsRepository {
  events: Event[] = []
  async create(data: createEventProps) {
    const event = {
      id: 'event',
      name: data.name,
      date: data.date,
      startedAt: data.startedAt,
      finalizedAt: data.finalizedAt,
      userId: data.userId,
      description: data.description,
    }

    this.events.push(event)

    return event
  }

  async findByDateInterval(data: {
    userId: string
    startedAt: Date
    finalizedAt: Date
  }) {
    const event =
      this.events.find((event) => {
        if (event.userId === data.userId) {
          if (
            event.startedAt <= data.startedAt &&
            event.finalizedAt >= data.startedAt
          ) {
            return event
          }

          if (
            event.startedAt <= data.finalizedAt &&
            event.finalizedAt >= data.finalizedAt
          ) {
            return event
          }

          if (
            event.startedAt >= data.startedAt &&
            event.finalizedAt <= data.finalizedAt
          ) {
            return event
          }
        }

        return null
      }) || null

    return event
  }

  async delete(data: { id: string; userId: string }) {
    const event = {
      id: data.id,
      name: 'event',
      date: new Date(),
      startedAt: new Date(),
      finalizedAt: new Date(),
      userId: data.userId,
      description: 'description',
    }

    return event
  }

  async findById(data: { id: string; userId: string }) {
    const event =
      this.events.find(
        (event) => event.id === data.id && event.userId === data.userId,
      ) || null

    return event
  }

  async findAllByUserId(data: {
    userId: string
    startedDate: Date
    endDate: Date
  }) {
    const event =
      this.events.filter((event) => event.userId === data.userId) || []

    return event
  }

  async updateEvent(data: updateEventProps) {
    const event = {
      id: data.id,
      name: data.name,
      date: data.date,
      startedAt: data.startedAt,
      finalizedAt: data.finalizedAt,
      userId: data.userId,
      description: data.description,
    }

    return event
  }
}
