import { PrismaMeasuresRepository } from '@/infra/repositories/prisma-measure-repository'

import { ConfirmReadMeasureUseCase } from '../confirm-read-measure'

export function makeConfirmMeasureUseCase() {
  const prismaMeasuresRepository = new PrismaMeasuresRepository()

  const confirmMeasureUseCase = new ConfirmReadMeasureUseCase(
    prismaMeasuresRepository,
  )

  return confirmMeasureUseCase
}
