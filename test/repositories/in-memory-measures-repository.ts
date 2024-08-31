import type { MeasuresRepository } from '@/domain/measure/application/repositories/measures-repository'
import type { Measure } from '@/domain/measure/enterprise/measure'

export class InMemoryMeasureRepository implements MeasuresRepository {
  public items: Measure[] = []

  async getMeasuresByCustomerIdAndMeasuresAtWithMonthThisYearAndTypeMeasure(
    customerId: string,
    measuredAt: Date,
    typeMeasure: string,
  ): Promise<Measure | null> {
    const measure = this.items.find(
      (measure) =>
        measure.customerId.toString() === customerId &&
        measure.measuredAt.getFullYear() === measuredAt.getFullYear() &&
        measure.measuredAt.getMonth() === measuredAt.getMonth() &&
        measure.measureType?.toString() === typeMeasure,
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

  async findByCostumerId(
    customerId: string,
    queryMeasureType?: string,
  ): Promise<Measure[] | null> {
    let measures = this.items.filter(
      (measure) => measure.customerId.toString() === customerId,
    )

    if (queryMeasureType) {
      measures = measures.filter(
        (measure) => measure.measureType?.toString() === queryMeasureType,
      )
    }

    if (measures.length === 0) {
      return null
    }

    return measures
  }
}
