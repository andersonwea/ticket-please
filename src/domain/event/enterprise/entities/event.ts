import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { EventSectionList } from './event-section-list'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { EventDateChangedEvent } from '../events/event-date-changed-event'

export interface EventProps {
  name: string
  description: string | null
  date: Date
  isPublished: boolean
  totalSpots: number
  totalSpotsLeft: number
  partnerId: UniqueEntityId
  sections: EventSectionList
}

export class Event extends AggregateRoot<EventProps> {
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
    if (date !== this.props.date) {
      this.addDomainEvent(new EventDateChangedEvent(this, date))
    }

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

  get sections() {
    return this.props.sections
  }

  set sections(sections: EventSectionList) {
    const totalSpots = sections
      .getItems()
      .reduce((acc, curr) => acc + curr.totalSpots, 0)

    this.props.sections = sections
    this.props.totalSpots += totalSpots
    this.props.totalSpotsLeft += totalSpots
  }

  static create(
    props: Optional<
      EventProps,
      'description' | 'isPublished' | 'totalSpots' | 'totalSpotsLeft'
    >,
    id?: UniqueEntityId,
  ) {
    const event = new Event(
      {
        ...props,
        description: props.description ?? null,
        isPublished: props.isPublished ?? false,
        totalSpots: props.totalSpots ?? 0,
        totalSpotsLeft: props.totalSpotsLeft ?? props.totalSpots ?? 0,
      },
      id,
    )

    return event
  }
}
