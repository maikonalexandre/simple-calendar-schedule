import { FastifyInstance } from 'fastify'
import { health } from '../controllers/health'
import { users } from '../controllers/users'
import { authenticate } from '../controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.get('/health', health)
  app.post('/users', users)
  app.post('/sessions', authenticate)

  // Authenticated route
}
