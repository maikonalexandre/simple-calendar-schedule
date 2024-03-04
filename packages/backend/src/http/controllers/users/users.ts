import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { CreateUserUseCase } from '../../../use-cases/create-user'
import { prismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '../../../use-cases/errors/user-already-exists-error'

export async function users(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  try {
    const createUser = new CreateUserUseCase(prismaUsersRepository)

    await createUser.execute({ email, name, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  reply.status(201).send()
}
