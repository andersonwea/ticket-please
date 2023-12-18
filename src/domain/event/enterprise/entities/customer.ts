import { Entity } from '@/core/entities/entity'
import { Cpf } from './value-objects/cpf'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface CustomerProps {
  name: string
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

  static create(props: CustomerProps, id?: UniqueEntityId) {
    const costumer = new Customer({ ...props }, id)

    return costumer
  }
}
