import { Entity } from '@/core/entities/entity'

export interface SectionProps {
  name: string
  description: string | null
  totalSpots: number
  price: number
}

export abstract class Section<
  Props extends SectionProps,
> extends Entity<Props> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get description() {
    return this.props.description
  }

  set description(description: string | null) {
    this.props.description = description
  }

  get totalSpots() {
    return this.props.totalSpots
  }

  get price() {
    return this.props.price
  }

  set price(price: number) {
    this.props.price = price
  }
}
