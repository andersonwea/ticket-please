import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Section, SectionProps } from './section'
import { Optional } from '@/core/types/optional'
import { SpotSectionList } from './spot-section-list'

interface EventSectionProps extends SectionProps {
  eventId: UniqueEntityId
}

export class EventSection extends Section<EventSectionProps> {
  get eventId() {
    return this.props.eventId
  }

  static create(
    props: Optional<EventSectionProps, 'spots'>,
    id?: UniqueEntityId,
  ) {
    const eventSection = new EventSection(
      {
        ...props,
        spots: props.spots ?? new SpotSectionList(),
      },
      id,
    )

    return eventSection
  }
}
