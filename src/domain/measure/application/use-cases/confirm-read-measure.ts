import type { MeasuresRepository } from '../repositories/measure-repository'
import { ConfirmationDuplicate } from './error/confirmation-duplicate'
import { MeasureNotFound } from './error/measure-not-found'

interface ConfirmReadMeasureRequest {
  measureId: string
  confirmedValue: number
}

export class ConfirmReadMeasureUseCase {
  constructor(private measuresRepository: MeasuresRepository) {}

  async execute({
    confirmedValue,
    measureId,
  }: ConfirmReadMeasureRequest): Promise<void> {
    const measure = await this.measuresRepository.findById(measureId)

    if (!measure) {
      throw new MeasureNotFound()
    }

    if (measure.measureConfirmed) {
      throw new ConfirmationDuplicate()
    }

    measure.confirmValue(confirmedValue)

    await this.measuresRepository.save(measure)
  }
}
