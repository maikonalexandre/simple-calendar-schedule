import { FastifyReply, FastifyRequest } from 'fastify'
import * as https from 'https'

export async function health(request: FastifyRequest, reply: FastifyReply) {
  const options = {
    method: 'GET',
    timeout: 5000,
  }

  const url = 'https://www.google.com'

  try {
    https.request(url, options)
  } catch (e) {
    reply.code(503)
  }

  reply.code(200).send({ message: 'Ok' })
}
