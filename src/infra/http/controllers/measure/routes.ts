import type { FastifyInstance } from 'fastify'

import { readMeasureController } from './read'

export async function measureRoutes(app: FastifyInstance) {
  app.post('/upload', readMeasureController)
}
