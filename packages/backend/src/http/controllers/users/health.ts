import { FastifyReply, FastifyRequest } from 'fastify'

export async function health(request: FastifyRequest, reply: FastifyReply) {
  // const test = {
  //   message: [
  //     {
  //       id: 'clt8q1rz60000iejtt86df96e',
  //       name: 'Nome feliz',
  //       date: '2024-04-01T12:00:00.000Z',
  //       startedAt: '2024-04-01T12:00:00.000Z',
  //       finalizedAt: '2024-05-01T12:00:00.000Z',
  //       userId: 'clt8ma9ct0000co69gpcw25iq',
  //       description: 'descrição feliz',
  //     },
  //   ],
  // }

  reply.code(200).send({ message: 'Ok' })
}
