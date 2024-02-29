import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'

export const auth = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => {
  done()
}
