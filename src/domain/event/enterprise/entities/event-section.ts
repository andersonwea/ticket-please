import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface EventSectionProps {
  name: string
  description: string | null
  totalSpots: number
  price: number
}

export class EventSection extends Entity<EventSectionProps> {
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

  get totalSpots() {
    return this.props.totalSpots
  }

  get price() {
    return this.props.price
  }

  set price(price: number) {
    this.props.price = price
  }

  static create(
    props: Optional<EventSection, 'description'>,
    id?: UniqueEntityId,
  ) {
    const eventSection = new EventSection(
      {
        ...props,
        description: props.description ?? null,
      },
      id,
    )

    return eventSection
  }
}
