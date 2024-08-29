import type { Measure } from '../../enterprise/measure'

export interface MeasuresRepository {
  getMeasuresByCustomerIdAndMeasuresAtWithMonthThisYear(
    customerId: string,
    measureAt: Date,
  ): Promise<Measure | null>

  create(measure: Measure): Promise<void>
  findById(id: string): Promise<Measure | null>
  save(measure: Measure): Promise<void>
}
