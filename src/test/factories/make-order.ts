import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Order, OrderProps } from '@/domain/event/enterprise/entities/order'
import { faker } from '@faker-js/faker'

export function makeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityId,
) {
  const order = Order.create(
    {
      amount: Number(faker.finance.amount({ dec: 0 })),
      customerId: new UniqueEntityId(),
      sectionSpotId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return order
}
