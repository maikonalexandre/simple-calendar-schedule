import Fastify from 'fastify'
import { ZodError } from 'zod'

import fastifyJwt from '@fastify/jwt'
import { env } from './src/env'
import cors from '@fastify/cors'
import { usersRoutes } from './src/http/routes/users'
import { eventRoutes } from './src/http/routes/events'

export const app = Fastify()

app.register(fastifyJwt, {
  secret: env.JTW_HASH,
})

app.register(cors, {
  origin: '*',
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
})

app.register(usersRoutes)
app.register(eventRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: error.message, issues: error.format() })
  }
  if (process.env.NODE_ENV !== 'production') {
    console.error(error)
  }
  return reply.status(500).send({ message: 'Internal server error' })
})
