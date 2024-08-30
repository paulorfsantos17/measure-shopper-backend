import type { Measure as PrismaMeasure, Prisma } from '@prisma/client'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Measure } from '@/domain/measure/enterprise/measure'
import { MeasureType } from '@/domain/measure/enterprise/value-objects/measure-type'

type MeasurementType = 'WATER' | 'GAS'

export class PrismaMeasureMapper {
  static toDomain(raw: PrismaMeasure): Measure {
    return Measure.create(
      {
        customerId: new UniqueEntityId(raw.customerId),
        measuredAt: raw.measuredAt,
        measureType: MeasureType.setMeasureType(
          raw.measureType as MeasurementType,
        ),
        measureValue: raw.measureValue,
        measureConfirmed: raw.measureConfirmed,
        imageUrl: raw.imageUrl,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(measure: Measure): Prisma.MeasureUncheckedCreateInput {
    return {
      id: measure.id.toValue(),
      customerId: measure.customerId.toValue(),
      measuredAt: measure.measuredAt,
      measureType: measure.measureType?.toString() ?? 'WATER',
      measureValue: measure.measureValue,
      measureConfirmed: measure.measureConfirmed,
      imageUrl: measure.imageUrl,
    }
  }
}
