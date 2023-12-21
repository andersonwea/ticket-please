import { Entity } from '@/core/entities/entity'
import { SpotSectionList } from './spot-section-list'
import { SpotSection, SpotSectionProps } from './spot-section'
import { Spot } from './spot'

export interface SectionProps {
  name: string
  description: string | null
  totalSpots: number
  price: number
  spots: SpotSectionList
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

  get spots() {
    return this.props.spots
  }

  set spots(spots: SpotSectionList) {
    this.props.spots = spots
  }
}
