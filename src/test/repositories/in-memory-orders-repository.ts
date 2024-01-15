import { OrdersRepository } from '@/domain/event/application/repositories/orders-repository'
import { Order } from '@/domain/event/enterprise/entities/order'

export class InMemoryOrdersRepository implements OrdersRepository {
  items: Order[] = []

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }
}
