import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrimaEventsRepository } from '../../../repositories/prisma/prisma-events-repository'
import { DeleteEventUseCase } from '../../../use-cases/delete-event'
import { EventNotFoundError } from '../../../use-cases/errors/event-not-found-error'

export async function deleteEvent(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteEventBodySchema = z.object({
    id: z.string(),
  })

  const { id } = deleteEventBodySchema.parse(request.body)

  try {
    const eventsRepository = new PrimaEventsRepository()
    const deleteEventUseCase = new DeleteEventUseCase(eventsRepository)

    await deleteEventUseCase.execute({
      id,
      userId: request.user.sub,
    })
  } catch (error) {
    if (error instanceof EventNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }

  reply.status(204).send()
}
