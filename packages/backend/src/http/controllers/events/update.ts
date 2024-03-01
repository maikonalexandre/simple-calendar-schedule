import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrimaEventsRepository } from '../../../repositories/prisma/prisma-events-repository'
import { UpdateEventsUseCase } from '../../../use-cases/update-event'

export async function listEvents(request: FastifyRequest, reply: FastifyReply) {
  const updateEventPropsSchema = z.object({
    id: z.string(),
    name: z.string(),
    date: z.date(),
    startedAt: z.date(),
    finalizedAt: z.date(),
    description: z.string(),
  })

  const { date, description, finalizedAt, id, name, startedAt } =
    updateEventPropsSchema.parse(request.query)

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
    console.log(error)

    throw error
  }
}
