import { makeMeasure } from '@test/factories/make-measure'
import { InMemoryLLMService } from '@test/model/in-memory-llm-service'
import { InMemoryMeasureRepository } from '@test/repositories/in-memory-measures-repository'
import { InMemoryImageStorageService } from '@test/storage/in-memory-image-storage-service'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { MeasureType } from '../../enterprise/value-objects/measure-type'
import { LLMService } from '../model/LLMService'
import { ImageStorageService } from '../storage/generate-image'
import { AlreadyExistMeasureInMonthThisYear } from './error/already-exist-measure-in-mount-this-year'
import { ReadMeasureUseCase } from './read-measure'

let sut: ReadMeasureUseCase
let measuresRepository: InMemoryMeasureRepository
let llmService: LLMService
let imageStorageService: ImageStorageService

describe('Read Measure Use Case', () => {
  beforeEach(() => {
    measuresRepository = new InMemoryMeasureRepository()
    llmService = new InMemoryLLMService()
    imageStorageService = new InMemoryImageStorageService()
    sut = new ReadMeasureUseCase(
      measuresRepository,
      llmService,
      imageStorageService,
    )
  })
  it('should be able to read measurements and create measure', async () => {
    const fixedDate = new Date()
    vi.setSystemTime(fixedDate)
    const imageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'
    const customerCode = 'customer123'
    const measuredAt = new Date()
    const measureType = MeasureType.WATER()

    const result = await sut.execute({
      customerCode,
      image: imageBase64,
      measuredAt,
      measureType,
    })

    expect(measuresRepository.items.length).toBe(1)
    expect(measuresRepository.items[0]).toEqual(
      expect.objectContaining({
        _id: expect.any(UniqueEntityId),
        props: expect.objectContaining({
          customerId: new UniqueEntityId('customer123'),
          measuredAt: fixedDate,
          measureType: MeasureType.WATER(),
          imageUrl: expect.any(String),
          measureConfirmed: false,
          measureValue: expect.any(Number),
        }),
      }),
    )

    expect(result.measure).toEqual({
      _id: expect.any(UniqueEntityId),
      props: expect.objectContaining({
        customerId: new UniqueEntityId('customer123'),
        measuredAt: fixedDate,
        measureType: MeasureType.WATER(),
        imageUrl: expect.any(String),
        measureConfirmed: false,
        measureValue: expect.any(Number),
      }),
    })

    vi.useRealTimers()
  })

  it('not should be able to read measurements and create measure when exist one measure in month this year', async () => {
    const imageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'
    const customerCode = 'customer123'
    const measuredAt = new Date()
    const measureType = MeasureType.WATER()

    measuresRepository.items.push(
      makeMeasure({
        customerId: new UniqueEntityId(customerCode),
        measuredAt: new Date(),
        measureType,
      }),
    )

    expect(
      sut.execute({
        customerCode,
        image: imageBase64,
        measuredAt,
        measureType,
      }),
    ).rejects.toThrowError(new AlreadyExistMeasureInMonthThisYear())
  })

  it('should be able to read measurements and create measure when exist one measure in month this year different', async () => {
    const dateNow = new Date('2024-02-01T00:00:00Z')
    vi.setSystemTime(dateNow)

    const dateInOtherMonth = new Date('2024-01-01T00:00:00Z')
    vi.setSystemTime(dateInOtherMonth)
    const imageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'
    const customerCode = 'customer123'
    const measuredAt = dateNow
    const measureType = MeasureType.WATER()

    measuresRepository.items.push(
      makeMeasure({
        customerId: new UniqueEntityId(customerCode),
        measuredAt: dateInOtherMonth,
        measureType: MeasureType.WATER(),
      }),
    )

    await sut.execute({
      customerCode,
      image: imageBase64,
      measuredAt,
      measureType,
    })

    expect(measuresRepository.items.length).toBe(2)
    expect(measuresRepository.items).toEqual([
      expect.objectContaining({
        props: expect.objectContaining({
          measuredAt: dateInOtherMonth,
        }),
      }),
      expect.objectContaining({
        props: expect.objectContaining({
          measuredAt: dateNow,
        }),
      }),
    ])
  })
})
