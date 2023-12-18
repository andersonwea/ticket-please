import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface PartnerProps {
  name: string
}

export class Partner extends Entity<PartnerProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.name = name
  }

  static create(props: PartnerProps, id?: UniqueEntityId) {
    const partner = new Partner({ ...props }, id)

    return partner
  }
}
