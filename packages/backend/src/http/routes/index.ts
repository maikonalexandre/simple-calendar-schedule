import { FastifyInstance } from 'fastify'
import { health } from '../controllers/health'
import { users } from '../controllers/users'
import { authenticate } from '../controllers/authenticate'
import { me } from '../controllers/me'
import { verifyJwt } from '../middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.get('/health', health)
  app.post('/users', users)
  app.post('/sessions', authenticate)

  // Authenticated route
  app.get('/me', { onRequest: [verifyJwt] }, me)
}
