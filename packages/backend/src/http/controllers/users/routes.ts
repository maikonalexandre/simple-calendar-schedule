import { FastifyInstance } from 'fastify'
import { users } from './users'
import { authenticate } from './authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', users)
  app.post('/sessions', authenticate)
}
