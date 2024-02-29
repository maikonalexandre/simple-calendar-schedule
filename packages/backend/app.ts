import Fastify from 'fastify'
import { ZodError } from 'zod'
import { appRoutes } from './src/http/routes'

export const app = Fastify()

// app.addHook('preHandler', auth)
app.register(appRoutes)

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
