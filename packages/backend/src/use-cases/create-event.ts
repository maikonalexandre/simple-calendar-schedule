import { Prisma } from '@prisma/client'
import { EventsRepository } from '../repositories/events-repository'
import { EventSubscribedError } from './errors/event-subscribed-error'

interface CreateEventProps {
  name: string
  date: Date
  startedAt: Date
  finalizedAt: Date
  userId: string
  description: string
}

export class CreateEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    date,
    description,
    finalizedAt,
    name,
    startedAt,
    userId,
  }: CreateEventProps) {
    const filterUserById: Prisma.UserWhereUniqueInput = {
      id: userId,
    }

    const event = await this.eventsRepository.findByDateInterval(
      userId,
      startedAt,
      finalizedAt,
    )

    if (event) {
      throw new EventSubscribedError()
    }

    await this.eventsRepository.create({
      date,
      description,
      finalizedAt,
      name,
      startedAt,
      user: {
        connect: filterUserById,
      },
    })
  }
}
