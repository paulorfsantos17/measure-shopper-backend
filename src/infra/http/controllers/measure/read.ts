import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { AlreadyExistMeasureInMonthThisYear } from '@/domain/measure/application/use-cases/error/already-exist-measure-in-mount-this-year'
import { makeReadMeasureUseCase } from '@/domain/measure/application/use-cases/factories/make-read-measure'
import { MeasureType } from '@/domain/measure/enterprise/value-objects/measure-type'
import { base64ImageSchema } from '@/utils/validation-image-base64'

import { ErrorPresenter } from '../presenters/error-presenter'
import { ReadMeasurePresenter } from './presents/read-measure-presents'

const readMeasureBody = z.object({
  image: base64ImageSchema,
  customer_code: z.string().min(1, 'É preciso fornecer um código de usuário.'),
  measure_date: z
    .string()
    .min(1, 'O valor da data de leitura é obrigatório.')
    .refine(
      (value) => {
        return !isNaN(Date.parse(value))
      },
      {
        message: 'Formato da data da leitura é inválido.',
      },
    ),
  measure_type: z
    .string()
    .min(1, 'O valor do tipo de leitura é obrigatório.')
    .refine((value) => ['WATER', 'GAS'].includes(value), {
      message: "Tipo de leitura é inválida. Passe ou 'WATER' or 'GAS'.",
    }),
})

export async function readMeasureController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { image, customer_code, measure_date, measure_type } =
    readMeasureBody.parse(request.body)

  const readMeasureUseCase = makeReadMeasureUseCase()

  try {
    const { measure } = await readMeasureUseCase.execute({
      image,
      customerCode: customer_code,
      measuredAt: new Date(measure_date),
      measureType: MeasureType.setMeasureType(measure_type),
    })

    const readMeasureResponse = ReadMeasurePresenter.toHTTP(measure)

    reply.status(200).send(readMeasureResponse)
  } catch (error: unknown) {
    if (error instanceof AlreadyExistMeasureInMonthThisYear) {
      reply.status(409).send(
        ErrorPresenter.toHttp({
          errorCode: 'DOUBLE_REPORT',
          errorDescription: error.message,
        }),
      )
    }
  }
}
