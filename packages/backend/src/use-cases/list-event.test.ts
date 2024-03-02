import { test, expect, describe, beforeEach } from 'vitest'

import { addHours, subHours } from 'date-fns'

import { CreateEventUseCase } from '../use-cases/create-event'
import { InMemoryEventsRepository } from '../repositories/in-memory/in-memory-events-repository'
import { ListEventsUseCase } from './list-events'
import { CreateUserUseCase } from './create-user'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-users-repository'

let eventsRepository: InMemoryEventsRepository
let listEventsUseCase: ListEventsUseCase

describe('List events Use Case', () => {
  beforeEach(() => {
    eventsRepository = new InMemoryEventsRepository()
    listEventsUseCase = new ListEventsUseCase(eventsRepository)
  })
  test('Should be list events', async () => {
    const createEventUseCase = new CreateEventUseCase(eventsRepository)
    const usersRepository = new InMemoryUserRepository()
    const createUser = new CreateUserUseCase(usersRepository)

    const user = await createUser.execute({
      email: 'test@test.com',
      name: 'Jhon Doe',
      password: '123',
    })

    const event = await createEventUseCase.execute({
      date: new Date(),
      description: 'Description',
      finalizedAt: addHours(new Date(), 1),
      startedAt: new Date(),
      name: 'event',
      userId: user.id,
    })

    const eventsList = await listEventsUseCase.execute({
      userId: user.id,
      endDate: addHours(new Date(), 7),
      startedDate: subHours(new Date(), 1),
    })

    expect(eventsList).toStrictEqual([event])
  })
})
