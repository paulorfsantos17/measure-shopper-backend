import { Entity } from '../../../core/entities/entity'
import type { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import type { Optional } from '../../../core/types/optional'
import type { MeasureType } from './value-objects/measure-type'
interface MeasureProps {
  customerId: UniqueEntityId
  measuredAt: Date
  measureType: MeasureType
  measureValue: number
  measureConfirmed: boolean
  imageUrl: string
}

export class Measure extends Entity<MeasureProps> {
  get customerId(): UniqueEntityId {
    return this.props.customerId
  }

  get measuredAt(): Date {
    return this.props.measuredAt
  }

  get measureType(): MeasureType {
    return this.props.measureType
  }

  get measureValue(): number {
    return this.props.measureValue
  }

  get measureConfirmed(): boolean {
    return this.props.measureConfirmed
  }

  get imageUrl(): string {
    return this.props.imageUrl
  }

  static create(
    props: Optional<MeasureProps, 'measureConfirmed'>,
    id?: UniqueEntityId,
  ) {
    const measure = new Measure({ measureConfirmed: false, ...props }, id)
    return measure
  }
}
