import { Measure } from '../../enterprise/measure'
import { MeasuresRepository } from '../repositories/measure-repository'
import { MeasureNotFound } from './error/measure-not-found'

interface FetchMeasureByCostumerRequest {
  customerId: string
  measureType?: 'WATER' | 'GAS'
}
interface FetchMeasureByCostumerResponse {
  measures: Measure[]
}

export class FetchMeasureByCostumerUseCase {
  constructor(private measuresRepository: MeasuresRepository) {}

  async execute({
    customerId,
    measureType,
  }: FetchMeasureByCostumerRequest): Promise<FetchMeasureByCostumerResponse> {
    const measures = await this.measuresRepository.findByCostumerId(
      customerId,
      measureType,
    )

    if (!measures) {
      throw new MeasureNotFound()
    }

    return {
      measures,
    }
  }
}
