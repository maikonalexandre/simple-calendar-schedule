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
    const event = await this.eventsRepository.findByDateInterval({
      finalizedAt,
      startedAt,
      userId,
    })

    if (event) {
      throw new EventSubscribedError()
    }

    const createdEvent = await this.eventsRepository.create({
      date,
      description,
      finalizedAt,
      name,
      startedAt,
      userId,
    })

    return createdEvent
  }
}
