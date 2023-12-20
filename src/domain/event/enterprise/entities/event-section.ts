import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Section, SectionProps } from './section'

interface EventSectionProps extends SectionProps {
  eventId: UniqueEntityId
}

export class EventSection extends Section<EventSectionProps> {
  get eventId() {
    return this.props.eventId
  }

  static create(props: EventSectionProps, id?: UniqueEntityId) {
    const eventSection = new EventSection(
      {
        ...props,
      },
      id,
    )

    return eventSection
  }
}
