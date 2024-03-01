import { FastifyInstance } from 'fastify'
import { users } from './users'
import { authenticate } from './authenticate'
import { health } from './health'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', users)
  app.post('/sessions', authenticate)

  app.get('/health', health)
}
