import { GeminiService } from '@/infra/model/gemini-service'
import { PrismaMeasuresRepository } from '@/infra/repositories/prisma-measure-repository'
import { GenerateImageService } from '@/infra/storage/generate-image-service'

import { ReadMeasureUseCase } from '../read-measure'

export function makeReadMeasureUseCase() {
  const geminiService = new GeminiService()
  const generateImageService = new GenerateImageService()
  const prismaMeasuresRepository = new PrismaMeasuresRepository()

  const readMeasureUseCase = new ReadMeasureUseCase(
    prismaMeasuresRepository,
    geminiService,
    generateImageService,
  )

  return readMeasureUseCase
}
