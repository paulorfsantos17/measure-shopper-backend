import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { Measure } from '../../enterprise/measure'
import type { MeasureType } from '../../enterprise/value-objects/measure-type'
import type { LLMService } from '../model/LLMService'
import type { MeasuresRepository } from '../repositories/measures-repository'
import type { ImageStorageService } from '../storage/generate-image'
import { AlreadyExistMeasureInMonthThisYear } from './error/already-exist-measure-in-mount-this-year'

interface ReadMeasureRequest {
  image: string
  customerCode: string
  measuredAt: Date
  measureType: MeasureType
}
interface ReadMeasureResponse {
  measure: Measure
}

export class ReadMeasureUseCase {
  constructor(
    private measuresRepository: MeasuresRepository,
    private llmService: LLMService,
    private imageStorageService: ImageStorageService,
  ) {}

  async execute({
    image,
    customerCode,
    measuredAt,
    measureType,
  }: ReadMeasureRequest): Promise<ReadMeasureResponse> {
    const alreadyMeasureWithMountAndYear =
      await this.measuresRepository.getMeasuresByCustomerIdAndMeasuresAtWithMonthThisYearAndTypeMeasure(
        customerCode,
        measuredAt,
        measureType.toString(),
      )

    if (alreadyMeasureWithMountAndYear) {
      throw new AlreadyExistMeasureInMonthThisYear()
    }

    const measureValue = await this.llmService.getValueMeasure(image)

    const expiresInSeconds = 60 * 60 * 24 * 15 // 15 days

    const imageTemporaryLink =
      await this.imageStorageService.generateTemporaryLinkForImage(
        image,
        expiresInSeconds,
      )

    const measure = Measure.create({
      customerId: new UniqueEntityId(customerCode),
      measuredAt,
      measureValue,
      imageUrl: imageTemporaryLink,
      measureType,
    })

    await this.measuresRepository.create(measure)

    return {
      measure,
    }
  }
}
