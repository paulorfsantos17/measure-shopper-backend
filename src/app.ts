import fastify from 'fastify'

import { measureRoutes } from './infra/http/controllers/measure/routes'

export const app = fastify()

app.register(measureRoutes)
