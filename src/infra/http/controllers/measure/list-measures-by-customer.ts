import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { MeasureNotFound } from '@/domain/measure/application/use-cases/error/measure-not-found'
import { makeFetchMeasureByCostumerUseCase } from '@/domain/measure/application/use-cases/factories/make-featch-measure-by-customer'

import { ErrorPresenter } from '../presenters/error-presenter'
import { ListMeasuresByCustomerPresenter } from './presents/list-measures-by-customer-presenters'

const listMeasureByCustomerParams = z.object({
  customer_code: z.string(),
})
const listMeasureByCustomerQuery = z.object({
  measure_type: z
    .string()
    .transform((val) => val.toUpperCase())
    .refine((val) => ['WATER', 'GAS'].includes(val), {
      message: 'Tipo de medição não permitida.',
    })
    .optional(),
})

export async function listMeasureByCustomerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { customer_code } = listMeasureByCustomerParams.parse(request.params)
  const { measure_type } = listMeasureByCustomerQuery.parse(request.query)

  const fetchMeasureByCostumer = makeFetchMeasureByCostumerUseCase()

  try {
    const { measures } = await fetchMeasureByCostumer.execute({
      customerId: customer_code,
      measureType: measure_type ? measure_type.toUpperCase() : undefined,
    })

    const measuresResponse = ListMeasuresByCustomerPresenter.toHTTP(
      measures,
      customer_code,
    )

    reply.status(200).send(measuresResponse)
  } catch (error: unknown) {
    if (error instanceof MeasureNotFound) {
      reply.status(404).send(
        ErrorPresenter.toHttp({
          errorCode: 'MEASURE_NOT_FOUND',
          errorDescription: 'Nenhuma leitura encontrada.',
        }),
      )
    }

    reply
      .code(500)
      .send({ message_error: 'Erro no servidor, tente novamente mais tarde.' })
  }
}
