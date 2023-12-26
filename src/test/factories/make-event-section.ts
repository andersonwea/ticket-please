import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
  EventSection,
  EventSectionProps,
} from '@/domain/event/enterprise/entities/event-section'

export function makeEventSection(
  override: Partial<EventSectionProps> = {},
  id?: UniqueEntityId,
) {
  const eventSection = EventSection.create(
    {
      name: faker.word.adjective(),
      description: faker.lorem.sentence(),
      price: Number(faker.finance.amount(1000, 5000)),
      totalSpots: Number(faker.finance.amount(10, 100, 0)),
      eventId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return eventSection
}
