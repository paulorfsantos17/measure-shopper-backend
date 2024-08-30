import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ConfirmationDuplicate } from '@/domain/measure/application/use-cases/error/confirmation-duplicate'
import { MeasureNotFound } from '@/domain/measure/application/use-cases/error/measure-not-found'
import { makeConfirmMeasureUseCase } from '@/domain/measure/application/use-cases/factories/make-confirm-measure'

import { ErrorPresenter } from '../presenters/error-presenter'

const confirmMeasureBody = z.object({
  measure_uuid: z
    .string()
    .min(1, 'É obrigatório informar uma leitura.')
    .uuid('O formato correto da leitura é um UUID.'),
  confirmed_value: z.number({
    invalid_type_error: 'O valor tem que ser um número.',
    required_error: 'É obrigatório informar um valor de confirmação.',
  }),
})

export async function confirmMeasureController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { confirmed_value, measure_uuid } = confirmMeasureBody.parse(
    request.body,
  )

  const confirmMeasureUseCase = makeConfirmMeasureUseCase()

  try {
    await confirmMeasureUseCase.execute({
      confirmedValue: confirmed_value,
      measureId: measure_uuid,
    })

    reply.status(200).send({
      success: true,
    })
  } catch (error: unknown) {
    if (error instanceof MeasureNotFound) {
      reply.status(404).send(
        ErrorPresenter.toHttp({
          errorCode: 'MEASURE_NOT_FOUND',
          errorDescription: error.message,
        }),
      )
    }

    if (error instanceof ConfirmationDuplicate) {
      reply.status(409).send(
        ErrorPresenter.toHttp({
          errorCode: 'MEASURE_NOT_FOUND',
          errorDescription: error.message,
        }),
      )
    }

    reply
      .code(500)
      .send({ message_error: 'Erro no servidor, tente novamente mais tarde.' })
  }
}
