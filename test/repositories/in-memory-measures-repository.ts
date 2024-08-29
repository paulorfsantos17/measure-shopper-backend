import type { MeasuresRepository } from '@/domain/measure/application/repositories/measure-repository'
import type { Measure } from '@/domain/measure/enterprise/measure'

export class InMemoryMeasureRepository implements MeasuresRepository {
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

  async findById(id: string): Promise<Measure | null> {
    const measure = this.items.find((item) => item.id.toString() === id)
    if (!measure) {
      return null
    }

    return measure
  }

  async save(measure: Measure): Promise<void> {
    const index = this.items.findIndex((measure) =>
      measure.id.equals(measure.id),
    )

    this.items[index] = measure
  }
}
