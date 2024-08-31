import type { Measure } from '../../enterprise/measure'

export interface MeasuresRepository {
  getMeasuresByCustomerIdAndMeasuresAtWithMonthThisYearAndTypeMeasure(
    customerId: string,
    measuredAt: Date,
    typeMeasure: string,
  ): Promise<Measure | null>

  create(measure: Measure): Promise<void>
  findById(id: string): Promise<Measure | null>
  save(measure: Measure): Promise<void>
  findByCostumerId(
    customerId: string,
    queryMeasureType?: string,
  ): Promise<Measure[] | null>
}
