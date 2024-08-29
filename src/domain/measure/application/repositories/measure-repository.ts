import type { Measure } from '../../enterprise/measure'

export interface MeasuresRepository {
  getMeasuresByCustomerIdAndMeasuresAtWithMonthThisYear(
    customerId: string,
    measureAt: Date,
  ): Promise<Measure | null>

  create(measure: Measure): Promise<void>
}
