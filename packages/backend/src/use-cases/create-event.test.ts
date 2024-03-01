import { test, expect, describe, beforeEach } from 'vitest'

import { addHours } from 'date-fns'

import { CreateEventUseCase } from '../use-cases/create-event'
import { InMemoryEventsRepository } from '../repositories/in-memory/in-memory-events-repository'
import { EventSubscribedError } from './errors/event-subscribed-error'

let eventsRepository: InMemoryEventsRepository
let createEventUseCase: CreateEventUseCase

describe('Create event Use Case', () => {
  beforeEach(() => {
    eventsRepository = new InMemoryEventsRepository()
    createEventUseCase = new CreateEventUseCase(eventsRepository)
  })
  test('should create a event', async () => {
    const event = await createEventUseCase.execute({
      date: new Date(),
      description: 'Description',
      finalizedAt: addHours(new Date(), 1),
      startedAt: new Date(),
      name: 'event',
      userId: 'user.id',
    })

    expect(event.id).toEqual(expect.any(String))
  })

  test('should not be able subscribe event', async () => {
    await createEventUseCase.execute({
      date: new Date(),
      description: 'Description',
      startedAt: new Date(),
      finalizedAt: addHours(new Date(), 1),
      name: 'event',
      userId: 'user.id',
    })

    expect(
      createEventUseCase.execute({
        date: new Date(),
        description: 'Description',
        startedAt: new Date(),
        finalizedAt: addHours(new Date(), 1),
        name: 'event',
        userId: 'user.id',
      }),
    ).rejects.toBeInstanceOf(EventSubscribedError)
  })
})
