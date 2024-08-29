import { Entity } from '../../../core/entities/entity'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { Optional } from '../../../core/types/optional'
import { MeasureType } from './value-objects/measure-type'

export interface MeasureProps {
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

  get measureType(): MeasureType | null {
    return this.props.measureType
  }

  set measureType(value: MeasureType) {
    this.props.measureType = value
  }

  get measureValue(): number {
    return this.props.measureValue
  }

  set measureValue(value: number) {
    this.props.measureValue = value
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
