import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { deleteEvent } from './delete'
import { listEvents } from './list'

export async function eventRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.post('/events', create)
  app.delete('/events', deleteEvent)
  app.get('/events', listEvents)
}
