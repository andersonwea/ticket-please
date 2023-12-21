import { Entity } from '@/core/entities/entity'

export interface SpotProps {
  location: string | null
  isReserved: boolean
  isPublished: boolean
}

export abstract class Spot<Props extends SpotProps> extends Entity<Props> {
  get location() {
    return this.props.location
  }

  set location(location: string | null) {
    this.props.location = location
  }

  get isReserved() {
    return this.props.isReserved
  }

  set isReserved(isReserved: boolean) {
    this.props.isReserved = isReserved
  }

  get isPublished() {
    return this.props.isPublished
  }

  set isPublished(isPublished: boolean) {
    this.props.isPublished = isPublished
  }
}
