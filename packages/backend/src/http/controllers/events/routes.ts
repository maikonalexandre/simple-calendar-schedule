import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '../../middlewares/verify-jwt'

export async function eventRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.post('/events', create)
}
