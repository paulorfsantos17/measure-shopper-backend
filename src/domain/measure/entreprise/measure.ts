import { Entity } from '../../../core/entities/entity'
import type { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import type { Optional } from '../../../core/types/optional'
interface MeasureProps {
  customerId: UniqueEntityId
  measuredAt: Date
  measureType: 'WATER' | 'GAS'
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

  get measureType(): 'WATER' | 'GAS' {
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
