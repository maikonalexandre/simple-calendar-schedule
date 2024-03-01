import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrimaEventsRepository } from '../../../repositories/prisma/prisma-events-repository'
import { UpdateEventsUseCase } from '../../../use-cases/update-event'
import { isAfter } from 'date-fns'
import { EventNotFoundError } from '../../../use-cases/errors/event-not-found-error'

export async function updateEvents(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  console.log('REQ', request.body)

  const updateEventPropsSchema = z
    .object({
      id: z.string(),
      name: z.string(),
      date: z.coerce.date(),
      startedAt: z.coerce.date(),
      finalizedAt: z.coerce.date(),
      description: z.string(),
    })
    .refine(({ finalizedAt, startedAt }) => isAfter(finalizedAt, startedAt))

  const { date, description, finalizedAt, id, name, startedAt } =
    updateEventPropsSchema.parse(request.body)

  try {
    const eventsRepository = new PrimaEventsRepository()
    const listEventUseCase = new UpdateEventsUseCase(eventsRepository)

    const events = await listEventUseCase.execute({
      date,
      description,
      finalizedAt,
      id,
      name,
      startedAt,
      userId: request.user.sub,
    })

    reply.status(200).send({ message: events })
  } catch (error) {
    if (error instanceof EventNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
