import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { AuthUseCase } from '../../../use-cases/auth'
import { UserCredentialsError } from '../../../use-cases/errors/user-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authUseCase = new AuthUseCase(usersRepository)

    const { user } = await authUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      { name: user.name },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    reply.status(200).send({
      user: { name: user.name, email: user.email },
      token,
    })
  } catch (error) {
    if (error instanceof UserCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
