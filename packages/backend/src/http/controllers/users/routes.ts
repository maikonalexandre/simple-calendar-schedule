import { FastifyInstance } from 'fastify'
import { users } from './users'
import { authenticate } from './authenticate'
import { health } from './health'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { me } from './me'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', users)
  app.post('/sessions', authenticate)

  app.get('/health', health)
  app.get('/me', { onRequest: [verifyJwt] }, me)
}
