import { FastifyInstance } from 'fastify'
import { health } from '../controllers/health'

export async function appRoutes(app: FastifyInstance) {
  app.get('/health', health)
}
