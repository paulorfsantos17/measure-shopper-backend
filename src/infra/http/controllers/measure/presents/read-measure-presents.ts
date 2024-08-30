import type { Measure } from '@/domain/measure/enterprise/measure'

export class ReadMeasurePresenter {
  static toHTTP(measure: Measure) {
    return {
      image_url: measure.imageUrl,
      measure_value: measure.measureValue,
      measure_uuid: measure.id.toString(),
    }
  }
}
