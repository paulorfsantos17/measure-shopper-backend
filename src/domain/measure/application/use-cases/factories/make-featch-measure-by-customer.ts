import { PrismaMeasuresRepository } from '@/infra/repositories/prisma-measure-repository'

import { FetchMeasureByCostumerUseCase } from '../fetch-measure-by-customer'

export function makeFetchMeasureByCostumerUseCase() {
  const prismaMeasuresRepository = new PrismaMeasuresRepository()

  const confirmMeasureUseCase = new FetchMeasureByCostumerUseCase(
    prismaMeasuresRepository,
  )

  return confirmMeasureUseCase
}
