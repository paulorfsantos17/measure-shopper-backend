import type { FastifyReply, FastifyRequest } from 'fastify'

export async function readMeasureController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  reply.send({
    message: 'Measure uploaded successfully',
  })
}
