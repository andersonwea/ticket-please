import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Partner } from '@/domain/event/enterprise/entities/partner'
import { faker } from '@faker-js/faker'

export function makePartner(
  override: Partial<Partner> = {},
  id?: UniqueEntityId,
) {
  const partner = Partner.create(
    {
      name: faker.company.name(),
      ...override,
    },
    id,
  )

  return partner
}
