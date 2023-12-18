import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface EventProps {
  name: string
  description: string | null
  date: Date
  isPublished: boolean
  totalSpots: number
  totalSpotsLeft: number
  partnerId: UniqueEntityId
}

export class Event extends Entity<EventProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get description() {
    return this.props.description
  }

  set description(description: string | null) {
    this.props.description = description
  }

  get date() {
    return this.props.date
  }

  set date(date: Date) {
    this.props.date = date
  }

  get isPublished() {
    return this.props.isPublished
  }

  set isPublished(isPublished: boolean) {
    this.props.isPublished = isPublished
  }

  get totalSpots() {
    return this.props.totalSpots
  }

  get totalSpotsLeft() {
    return this.props.totalSpotsLeft
  }

  get partnerId() {
    return this.props.partnerId
  }

  static create(
    props: Optional<
      EventProps,
      'isPublished' | 'totalSpots' | 'totalSpotsLeft'
    >,
    id?: UniqueEntityId,
  ) {
    const event = new Event(
      {
        ...props,
        isPublished: props.isPublished ?? false,
        totalSpots: props.totalSpots ?? 0,
        totalSpotsLeft: props.totalSpotsLeft ?? props.totalSpots ?? 0,
      },
      id,
    )

    return event
  }
}
