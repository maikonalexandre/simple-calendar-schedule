import { EventsRepository } from '../repositories/events-repository'
import { EventNotFoundError } from './errors/event-not-found-error'

interface updateEventProps {
  id: string
  name: string
  date: Date
  startedAt: Date
  finalizedAt: Date
  description: string
  userId: string
}

export class UpdateEventsUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute(data: updateEventProps) {
    const event = await this.eventsRepository.findById({
      id: data.id,
      userId: data.userId,
    })

    if (!event) {
      throw new EventNotFoundError()
    }

    const updatedEvent = await this.eventsRepository.updateEvent(data)

    return updatedEvent
  }
}
