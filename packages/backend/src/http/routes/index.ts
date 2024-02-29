import { FastifyInstance } from 'fastify'
import { health } from '../controllers/health'
import { users } from '../controllers/users'

export async function appRoutes(app: FastifyInstance) {
  app.get('/health', health)
  app.post('/users', users)
}
