import type { Measure } from '../../enterprise/measure'

export interface MeasuresRepository {
  getMeasuresByCustomerIdAndMeasuresAt(
    customerId: string,
    measureAt: Date,
  ): Promise<Measure>
}
