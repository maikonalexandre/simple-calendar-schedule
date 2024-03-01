import { EventsRepository } from '../repositories/events-repository'

interface ListEventsProps {
  endDate: Date
  startedDate: Date
  userId: string
}

export class ListEventsUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({ endDate, startedDate, userId }: ListEventsProps) {
    const event = await this.eventsRepository.findAllByUserId({
      endDate,
      startedDate,
      userId,
    })

    return event
  }
}
