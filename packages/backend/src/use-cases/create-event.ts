import { Prisma } from '@prisma/client'
import { EventsRepository } from '../repositories/events-repository'
import { UsersRepository } from '../repositories/users-repository'
import { UserNotFoundError } from './errors/user-not-found-error'
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
  constructor(
    private eventsRepository: EventsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    date,
    description,
    finalizedAt,
    name,
    startedAt,
    userId,
  }: CreateEventProps) {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new UserNotFoundError()
    }

    const filterUserById: Prisma.UserWhereUniqueInput = {
      id: user.id,
      email: user.email,
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
