import type { Measure } from '../../enterprise/measure'
type MeasureType = 'WATER' | 'GAS'

export interface MeasuresRepository {
  getMeasuresByCustomerIdAndMeasuresAtWithMonthThisYear(
    customerId: string,
    measureAt: Date,
  ): Promise<Measure | null>

  create(measure: Measure): Promise<void>
  findById(id: string): Promise<Measure | null>
  save(measure: Measure): Promise<void>
  findByCostumerId(
    costumerId: string,
    queryMeasureType?: MeasureType,
  ): Promise<Measure[] | null>
}
