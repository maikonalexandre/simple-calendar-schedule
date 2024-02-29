import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { AuthUseCase } from '../../use-cases/auth'
import { UserCredentialsError } from '../../use-cases/errors/user-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authUseCase = new AuthUseCase(usersRepository)

    await authUseCase.execute({ email, password })
  } catch (error) {
    if (error instanceof UserCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

  reply.status(200).send()
}
