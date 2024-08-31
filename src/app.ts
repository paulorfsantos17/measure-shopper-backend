import { fastifyStatic } from '@fastify/static'
import fastify from 'fastify'
import path from 'path'
import { ZodError } from 'zod'

import { measureRoutes } from './infra/http/controllers/measure/routes'

export const app = fastify()

app.register(fastifyStatic, {
  root: path.join(__dirname, 'images'),
  prefix: '/images/',
})

app.register(measureRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      erro_code: 'INVALID_DATA',
      error_description: error.format(),
    })
  }
})
