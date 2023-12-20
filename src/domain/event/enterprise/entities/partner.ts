import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Event } from './event'
import { EventSectionList } from './event-section-list'

interface PartnerProps {
  name: string
}

interface CreateEventProps {
  name: string
  description: string | null
  date: Date
}

export class Partner extends Entity<PartnerProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.name = name
  }

  createEvent(props: CreateEventProps, id?: UniqueEntityId) {
    const event = Event.create(
      {
        ...props,
        partnerId: this.id,
        sections: new EventSectionList(),
      },
      id,
    )

    return event
  }

  static create(props: PartnerProps, id?: UniqueEntityId) {
    const partner = new Partner({ ...props }, id)

    return partner
  }
}
