import { FastifyRequest, FastifyReply } from 'fastify'

import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { GetUserUseCase } from '../../../use-cases/get-user'
import { UserNotFoundError } from '../../../use-cases/errors/user-not-found-error'

export async function me(request: FastifyRequest, reply: FastifyReply) {
  try {
    const usersRepository = new PrismaUsersRepository()
    const getUserUseCase = new GetUserUseCase(usersRepository)

    const user = await getUserUseCase.execute({ userId: request.user.sub })

    reply.status(200).send({ user: { name: user.name, email: user.email } })
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
