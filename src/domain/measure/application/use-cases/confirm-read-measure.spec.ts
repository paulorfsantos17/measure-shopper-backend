import { makeMeasure } from '@test/factories/make-measure'
import { InMemoryMeasureRepository } from '@test/repositories/in-memory-measures-repository'

import { ConfirmReadMeasureUseCase } from './confirm-read-measure'
import { ConfirmationDuplicate } from './error/confirmation-duplicate'
import { MeasureNotFound } from './error/measure-not-found'

let sut: ConfirmReadMeasureUseCase
let measuresRepository: InMemoryMeasureRepository

describe('Confirm Read Measure Use Case', () => {
  beforeEach(() => {
    measuresRepository = new InMemoryMeasureRepository()

    sut = new ConfirmReadMeasureUseCase(measuresRepository)
  })
  it('should be able confirm measure value that exist', async () => {
    const confirmedValue = 250

    const measure = makeMeasure()
    const measureId = measure.id.toValue()
    measuresRepository.items.push(measure)

    expect(measure.measureConfirmed).toBeFalsy()

    await sut.execute({
      confirmedValue,
      measureId,
    })

    expect(measuresRepository.items[0].measureConfirmed).toBeTruthy()
    expect(measuresRepository.items[0].measureValue).toBe(250)
  })

  it('not should be able confirm measure value that already confirmed', async () => {
    const confirmedValue = 250
    const measureId = 'non-existing-measure-id'

    expect(
      sut.execute({
        confirmedValue,
        measureId,
      }),
    ).rejects.toThrow(MeasureNotFound)
  })

  it('not should be able confirm measure value that not exist', async () => {
    const confirmedValue = 250

    const measure = makeMeasure()
    measure.confirmValue(250)

    const measureId = measure.id.toValue()
    measuresRepository.items.push(measure)

    expect(
      sut.execute({
        confirmedValue,
        measureId,
      }),
    ).rejects.toThrow(ConfirmationDuplicate)
  })
})
