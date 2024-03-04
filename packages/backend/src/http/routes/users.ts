import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-jwt'

import { users } from '../controllers/users/users'
import { authenticate } from '../controllers/users/authenticate'
import { health } from '../controllers/users/health'
import { me } from '../controllers/users/me'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', users)
  app.post('/sessions', authenticate)

  app.get('/health', health)
  app.get('/me', { onRequest: [verifyJwt] }, me)
}
