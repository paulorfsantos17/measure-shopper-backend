import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Measure, type MeasureProps } from '@/domain/measure/enterprise/measure'
import { MeasureType } from '@/domain/measure/enterprise/value-objects/measure-type'

export function makeMeasure(
  override: Partial<MeasureProps> = {},
  id?: UniqueEntityId,
) {
  const measure = Measure.create(
    {
      customerId: new UniqueEntityId(),
      measuredAt: new Date(),
      measureType: MeasureType.WATER(),
      measureValue: 100,
      imageUrl: 'https://example.com/image.jpg',
      ...override,
    },
    id,
  )

  return measure
}
