import type { MeasuresRepository } from '@/domain/measure/application/repositories/measure-repository'
import type { Measure } from '@/domain/measure/enterprise/measure'

export class inMemoryMeasureRepository implements MeasuresRepository {
  public items: Measure[] = []

  async getMeasuresByCustomerIdAndMeasuresAtWithMonthThisYear(
    customerId: string,
    measureAt: Date,
  ): Promise<Measure | null> {
    const measure = this.items.find(
      (measure) =>
        measure.customerId.toString() === customerId &&
        measure.measuredAt.getFullYear() === measureAt.getFullYear() &&
        measure.measuredAt.getMonth() === measureAt.getMonth(),
    )

    if (!measure) {
      return null
    }

    return measure
  }

  async create(measure: Measure): Promise<void> {
    this.items.push(measure)
  }
}
