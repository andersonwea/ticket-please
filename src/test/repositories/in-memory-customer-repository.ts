import { CustomersRepository } from '@/domain/event/application/repositories/customers-repository'
import { Customer } from '@/domain/event/enterprise/entities/customer'

export class InMemoryCustomersRepository implements CustomersRepository {
  items: Customer[] = []

  async create(customer: Customer): Promise<void> {
    this.items.push(customer)
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = this.items.find(
      (customer) => customer.id.toString() === id,
    )

    if (!customer) {
      return null
    }

    return customer
  }
}
