import { EventsRepository } from '../repositories/events-repository'
import { EventNotFoundError } from './errors/event-not-found-error'

interface DeleteEventProps {
  id: string
  userId: string
}

export class DeleteEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({ id, userId }: DeleteEventProps) {
    const event = await this.eventsRepository.findById(id, userId)

    if (!event) {
      throw new EventNotFoundError()
    }

    const deletedEvent = await this.eventsRepository.delete(id, userId)

    return deletedEvent
  }
}
