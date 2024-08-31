import { FastifyInstance } from 'fastify'

import { confirmMeasureController } from './confirm'
import { listMeasureByCustomerController } from './list-measures-by-customer'
import { readMeasureController } from './read'

export async function measureRoutes(app: FastifyInstance) {
  app.post('/upload', readMeasureController)
  app.patch('/confirm', confirmMeasureController)
  app.get('/:customer_code/list', listMeasureByCustomerController)
}
