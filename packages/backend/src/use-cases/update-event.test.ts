import { test, expect, describe, beforeEach } from 'vitest'

import { addHours } from 'date-fns'

import { UpdateEventsUseCase } from '../use-cases/update-event'
import { InMemoryEventsRepository } from '../repositories/in-memory/in-memory-events-repository'
import { CreateEventUseCase } from './create-event'
import { EventNotFoundError } from './errors/event-not-found-error'

let eventsRepository: InMemoryEventsRepository
let updateEventsUseCase: UpdateEventsUseCase

describe('Update event use case', () => {
  beforeEach(() => {
    eventsRepository = new InMemoryEventsRepository()
    updateEventsUseCase = new UpdateEventsUseCase(eventsRepository)
  })
  test('Should be update event ', async () => {
    const createEventUseCase = new CreateEventUseCase(eventsRepository)

    const event = await createEventUseCase.execute({
      date: new Date(),
      description: 'Description',
      finalizedAt: addHours(new Date(), 1),
      startedAt: new Date(),
      name: 'event',
      userId: 'user.id',
    })

    const newName = 'Evento atualizado'

    const updatedEvent = await updateEventsUseCase.execute({
      ...event,
      name: newName,
    })

    expect(updatedEvent?.name).toEqual(newName)
    expect(updatedEvent?.id).toEqual(event.id)
  })

  test('Should not be able update not found event ', async () => {
    expect(
      updateEventsUseCase.execute({
        date: new Date(),
        description: 'Description',
        finalizedAt: addHours(new Date(), 1),
        startedAt: new Date(),
        name: 'event',
        userId: 'invalid',
        id: 'event',
      }),
    ).rejects.toBeInstanceOf(EventNotFoundError)
  })

  test('Should not be able update not invalid event', async () => {
    const createEventUseCase = new CreateEventUseCase(eventsRepository)

    const event = await createEventUseCase.execute({
      date: new Date(),
      description: 'Description',
      finalizedAt: addHours(new Date(), 1),
      startedAt: new Date(),
      name: 'event',
      userId: 'user.id',
    })

    expect(
      updateEventsUseCase.execute({
        date: event.date,
        description: event.description,
        finalizedAt: event.finalizedAt,
        id: 'invalid',
        name: event.name,
        startedAt: event.startedAt,
        userId: event.userId,
      }),
    ).rejects.toBeInstanceOf(EventNotFoundError)
  })
})
