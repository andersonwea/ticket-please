import { DomainEvents } from '@/core/events/domain-events'
import { OrdersRepository } from '@/domain/event/application/repositories/orders-repository'
import { Order, OrderStatus } from '@/domain/event/enterprise/entities/order'

export class InMemoryOrdersRepository implements OrdersRepository {
  items: Order[] = []

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((item) => item.id.toString() === id)

    if (!order) {
      return null
    }

    return order
  }

  async create(order: Order): Promise<void> {
    if (order.status === OrderStatus.PAID) {
      DomainEvents.dispatchEventsForAggregate(order.id)
    }

    this.items.push(order)
  }
}
