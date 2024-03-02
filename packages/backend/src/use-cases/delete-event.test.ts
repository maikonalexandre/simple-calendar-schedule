import { test, expect, describe, beforeEach } from 'vitest'

import { addHours } from 'date-fns'

import { DeleteEventUseCase } from '../use-cases/delete-event'
import { InMemoryEventsRepository } from '../repositories/in-memory/in-memory-events-repository'
import { CreateEventUseCase } from './create-event'
import { EventNotFoundError } from './errors/event-not-found-error'

let eventsRepository: InMemoryEventsRepository
let deleteEventUseCase: DeleteEventUseCase

describe('Delete event use case', () => {
  beforeEach(() => {
    eventsRepository = new InMemoryEventsRepository()
    deleteEventUseCase = new DeleteEventUseCase(eventsRepository)
  })
  test('Should be delete event ', async () => {
    const createEventUseCase = new CreateEventUseCase(eventsRepository)

    const event = await createEventUseCase.execute({
      date: new Date(),
      description: 'Description',
      finalizedAt: addHours(new Date(), 1),
      startedAt: new Date(),
      name: 'event',
      userId: 'user.id',
    })

    const deletedEvent = await deleteEventUseCase.execute({
      id: event.id,
      userId: 'user.id',
    })

    expect(deletedEvent?.id).toEqual(event.id)
  })

  test('Should not be able delete not found event ', async () => {
    expect(
      deleteEventUseCase.execute({
        id: 'event',
        userId: 'user.id',
      }),
    ).rejects.toBeInstanceOf(EventNotFoundError)
  })

  test('Should not be able delete not invalid event', async () => {
    const createEventUseCase = new CreateEventUseCase(eventsRepository)

    await createEventUseCase.execute({
      date: new Date(),
      description: 'Description',
      finalizedAt: addHours(new Date(), 1),
      startedAt: new Date(),
      name: 'event',
      userId: 'user.id',
    })

    expect(
      deleteEventUseCase.execute({
        id: 'idInválido',
        userId: 'user.id',
      }),
    ).rejects.toBeInstanceOf(EventNotFoundError)
  })
})
