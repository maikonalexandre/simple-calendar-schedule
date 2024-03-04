import { FastifyInstance } from 'fastify'
import { create } from '../controllers/events/create'
import { deleteEvent } from '../controllers/events/delete'

import { listEvents } from '../controllers/events/list'
import { updateEvents } from '../controllers/events/update'

import { verifyJwt } from '../middlewares/verify-jwt'

export async function eventRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.post('/events', create)
  app.delete('/events', deleteEvent)
  app.get('/events', listEvents)
  app.patch('/events', updateEvents)
}
