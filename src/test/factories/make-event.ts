import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EventProps } from '@/domain/event/enterprise/entities/event'
import { makePartner } from './make-partner'
import { faker } from '@faker-js/faker'

export function makeEvent(
  override: Partial<EventProps> = {},
  id?: UniqueEntityId,
) {
  const partner = makePartner()

  const event = partner.createEvent(
    {
      name: faker.lorem.sentence(2),
      description: faker.lorem.paragraph(2),
      date: faker.date.future(),
      ...override,
    },
    id,
  )

  return event
}
