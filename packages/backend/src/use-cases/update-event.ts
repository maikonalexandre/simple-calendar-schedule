import { EventsRepository } from '../repositories/events-repository'

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
    const event = await this.eventsRepository.updateEvent(data)

    return event
  }
}
