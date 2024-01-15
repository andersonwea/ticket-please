import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
  Customer,
  CustomerProps,
} from '@/domain/event/enterprise/entities/customer'
import { Cpf } from '@/domain/event/enterprise/entities/value-objects/cpf'
import { Email } from '@/domain/event/enterprise/entities/value-objects/email'

export function makeCustomer(
  override: Partial<CustomerProps> = {},
  id?: UniqueEntityId,
) {
  const customer = Customer.create(
    {
      name: faker.person.fullName(),
      email: new Email(faker.internet.email()),
      cpf: new Cpf('934.797.732-22'),
      ...override,
    },
    id,
  )

  return customer
}
