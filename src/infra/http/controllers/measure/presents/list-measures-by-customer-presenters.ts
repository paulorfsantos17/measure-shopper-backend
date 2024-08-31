import { Measure } from '@/domain/measure/enterprise/measure'

export class ListMeasuresByCustomerPresenter {
  static toHTTP(measure: Measure[], customerCode: string) {
    return {
      customer_code: customerCode,
      measures: measure.map((measure) => {
        return {
          measure_uuid: measure.id.toString(),
          measure_datetime: measure.measuredAt,
          measure_type: measure.measureType?.toString(),
          has_confirmed: measure.measureConfirmed,
          image_url: measure.imageUrl,
        }
      }),
    }
  }
}
