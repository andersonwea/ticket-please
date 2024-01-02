import { Customer } from '../../enterprise/entities/customer'

export interface CustomersRepository {
  create(customer: Customer): Promise<void>
  findById(id: string): Promise<Customer | null>
}
