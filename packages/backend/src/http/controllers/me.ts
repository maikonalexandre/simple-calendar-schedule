import { FastifyRequest, FastifyReply } from 'fastify'

export async function me(request: FastifyRequest, reply: FastifyReply) {
  console.log(request.headers)

  reply.status(201).send()
}
