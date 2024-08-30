import type { FastifyInstance } from 'fastify'

import { confirmMeasureController } from './confirm'
import { readMeasureController } from './read'

export async function measureRoutes(app: FastifyInstance) {
  app.post('/upload', readMeasureController)
  app.patch('/confirm', confirmMeasureController)
}
