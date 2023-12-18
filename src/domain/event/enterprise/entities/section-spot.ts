import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface SectionSpotProps {
  location: string | null
  isReserved: boolean
  isPublished: boolean
}

export class SectionSpot extends Entity<SectionSpotProps> {
  get location() {
    return this.props.location
  }

  set location(location: string | null) {
    this.props.location = location
  }

  get isReserved() {
    return this.props.isReserved
  }

  get isPublished() {
    return this.props.isPublished
  }

  static create(
    props: Optional<
      SectionSpotProps,
      'isPublished' | 'isReserved' | 'location'
    >,
    id?: UniqueEntityId,
  ) {
    const sectionSpot = new SectionSpot(
      {
        ...props,
        isPublished: props.isPublished ?? false,
        isReserved: props.isReserved ?? false,
        location: props.location ?? null,
      },
      id,
    )

    return sectionSpot
  }
}
