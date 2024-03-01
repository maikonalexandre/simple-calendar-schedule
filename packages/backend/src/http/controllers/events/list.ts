import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrimaEventsRepository } from '../../../repositories/prisma/prisma-events-repository'
import { ListEventsUseCase } from '../../../use-cases/list-events'

export async function listEvents(request: FastifyRequest, reply: FastifyReply) {
  console.log(request.query)

  const createEventBodySchema = z.object({
    endDate: z.coerce.date(),
    startedDate: z.coerce.date(),
  })

  const { endDate, startedDate } = createEventBodySchema.parse(request.query)

  try {
    const eventsRepository = new PrimaEventsRepository()
    const listEventUseCase = new ListEventsUseCase(eventsRepository)

    const events = await listEventUseCase.execute({
      endDate,
      startedDate,
      userId: request.user.sub,
    })

    reply.status(200).send({ message: events })
  } catch (error) {
    console.log(error)

    throw error
  }
}
