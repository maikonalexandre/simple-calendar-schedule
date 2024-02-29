import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../services/prisma'

export async function users(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email({ message: 'Email invalid' }),
    password: z.string().min(6, { message: 'Password length invalid' }),
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  await prisma.user.create({
    data: {
      email,
      name,
      password_hash: password,
    },
  })

  reply.status(201).send()
}
