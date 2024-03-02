import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrimaEventsRepository } from '../../../repositories/prisma/prisma-events-repository'
import { ListEventsUseCase } from '../../../use-cases/list-events'
import { getWeekInterval } from '../../../utils'

import { format, isAfter } from 'date-fns'

export async function listEvents(request: FastifyRequest, reply: FastifyReply) {
  const list = z
    .object({
      endDate: z.coerce.date(),
      startedDate: z.coerce.date(),
    })
    .refine(({ endDate, startedDate }) => isAfter(endDate, startedDate))

  const { endDate, startedDate } = list.parse(request.query)

  try {
    const eventsRepository = new PrimaEventsRepository()
    const listEventUseCase = new ListEventsUseCase(eventsRepository)

    const events = await listEventUseCase.execute({
      endDate,
      startedDate,
      userId: request.user.sub,
    })

    const daysInterval = getWeekInterval(startedDate, endDate)

    if (events && events.length > 1) {
      const refactoredEventsByDaysInterval = daysInterval.map((day) => {
        const dayEvents = events.filter(
          (event) =>
            format(event.startedAt, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'),
        )

        return { day, eventos: dayEvents }
      })

      reply.code(200).send(refactoredEventsByDaysInterval)
    }

    reply.status(200).send(events)
  } catch (error) {
    console.log(error)

    throw error
  }
}
