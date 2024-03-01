import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CreateEventUseCase } from '../../../use-cases/create-event'
import { PrimaEventsRepository } from '../../../repositories/prisma/prisma-events-repository'
import { EventSubscribedError } from '../../../use-cases/errors/event-subscribed-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createEventBodySchema = z.object({
    date: z.coerce.date(),
    description: z.string(),
    finalizedAt: z.coerce.date(),
    name: z.string(),
    startedAt: z.coerce.date(),
  })

  const { date, description, finalizedAt, name, startedAt } =
    createEventBodySchema.parse(request.body)

  try {
    const eventsRepository = new PrimaEventsRepository()
    const createEvent = new CreateEventUseCase(eventsRepository)

    await createEvent.execute({
      date,
      description,
      finalizedAt,
      name,
      startedAt,
      userId: request.user.sub,
    })
  } catch (error) {
    if (error instanceof EventSubscribedError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  reply.status(201).send()
}
