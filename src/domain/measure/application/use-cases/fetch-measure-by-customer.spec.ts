import { makeMeasure } from '@test/factories/make-measure'
import { InMemoryMeasureRepository } from '@test/repositories/in-memory-measures-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { MeasureType } from '../../enterprise/value-objects/measure-type'
import { MeasureNotFound } from './error/measure-not-found'
import { FetchMeasureByCostumerUseCase } from './fetch-measure-by-customer'

let sut: FetchMeasureByCostumerUseCase
let measuresRepository: InMemoryMeasureRepository

describe('Fetch Measure by customer Use Case', () => {
  beforeEach(() => {
    measuresRepository = new InMemoryMeasureRepository()

    sut = new FetchMeasureByCostumerUseCase(measuresRepository)
  })

  it('should be able fetch measure by costumerId', async () => {
    const customerId = 'customer123'
    for (let i = 0; i < 3; i++) {
      const measure = makeMeasure({
        customerId: new UniqueEntityId(customerId),
      })
      measuresRepository.items.push(measure)
    }

    for (let i = 0; i < 3; i++) {
      const measure = makeMeasure()
      measuresRepository.items.push(measure)
    }

    const result = await sut.execute({ customerId })

    expect(result.measures.length).toBe(3)
    expect(measuresRepository.items.length).toBe(6)
    expect(result.measures).toEqual([
      expect.objectContaining({
        props: expect.objectContaining({
          customerId: new UniqueEntityId(customerId),
        }),
      }),
      expect.objectContaining({
        props: expect.objectContaining({
          customerId: new UniqueEntityId(customerId),
        }),
      }),
      expect.objectContaining({
        props: expect.objectContaining({
          customerId: new UniqueEntityId(customerId),
        }),
      }),
    ])
  })

  it('should be able fetch measure by costumerId and query of value WATER', async () => {
    const customerId = 'customer123'

    const measureWater = makeMeasure({
      customerId: new UniqueEntityId(customerId),
      measureType: MeasureType.WATER(),
    })
    measuresRepository.items.push(measureWater)

    const measureGas = makeMeasure({
      customerId: new UniqueEntityId(customerId),
      measureType: MeasureType.GAS(),
    })
    measuresRepository.items.push(measureGas)

    const result = await sut.execute({ customerId, measureType: 'WATER' })

    expect(result.measures.length).toBe(1)
    expect(measuresRepository.items.length).toBe(2)
    expect(result.measures).toEqual([
      expect.objectContaining({
        props: expect.objectContaining({
          customerId: new UniqueEntityId(customerId),
          measureType: MeasureType.WATER(),
        }),
      }),
    ])
  })

  it('should be able fetch measure by costumerId and query of value GAS', async () => {
    const customerId = 'customer123'

    const measureWater = makeMeasure({
      customerId: new UniqueEntityId(customerId),
      measureType: MeasureType.WATER(),
    })
    measuresRepository.items.push(measureWater)

    const measureGas = makeMeasure({
      customerId: new UniqueEntityId(customerId),
      measureType: MeasureType.GAS(),
    })
    measuresRepository.items.push(measureGas)

    const result = await sut.execute({ customerId, measureType: 'GAS' })

    expect(result.measures.length).toBe(1)
    expect(measuresRepository.items.length).toBe(2)
    expect(result.measures).toEqual([
      expect.objectContaining({
        props: expect.objectContaining({
          customerId: new UniqueEntityId(customerId),
          measureType: MeasureType.GAS(),
        }),
      }),
    ])
  })

  it('not should be able fetch when not exist measures of this customer and query measureType', async () => {
    expect(
      sut.execute({
        customerId: 'customerId',
        measureType: 'GAS',
      }),
    ).rejects.toThrow(MeasureNotFound)
  })
})
