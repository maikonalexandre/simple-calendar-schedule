import { FastifyReply, FastifyRequest } from 'fastify'
import { addWeeks, isAfter } from 'date-fns'
import { timestampToDate } from '../../utils'

export const verifyJwt = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    await request.jwtVerify()

    const createdAt = request.user.iat
    const expiredDate = addWeeks(timestampToDate(createdAt), 1)

    if (isAfter(new Date(), expiredDate)) {
      reply.status(401).send({ message: 'Unauthorized' })
    }
  } catch (error) {
    reply.status(401).send({ message: 'Unauthorized' })
  }
}
