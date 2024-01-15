import { Entity } from '@/core/entities/entity'
import { Cpf } from './value-objects/cpf'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Email } from './value-objects/email'

export interface CustomerProps {
  name: string
  email: Email
  cpf: Cpf
}

export class Customer extends Entity<CustomerProps> {
  get cpf() {
    return this.props.cpf
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  static create(props: CustomerProps, id?: UniqueEntityId) {
    const costumer = new Customer({ ...props }, id)

    return costumer
  }
}
