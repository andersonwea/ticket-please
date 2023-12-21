import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Spot, SpotProps } from './spot'

export interface SpotSectionProps extends SpotProps {
  sectionId: UniqueEntityId
}

export class SpotSection extends Spot<SpotSectionProps> {
  static create(
    props: Optional<
      SpotSectionProps,
      'isPublished' | 'isReserved' | 'location'
    >,
    id?: UniqueEntityId,
  ) {
    const spotSection = new SpotSection(
      {
        ...props,
        isPublished: props.isPublished ?? false,
        isReserved: props.isReserved ?? false,
        location: props.location ?? null,
      },
      id,
    )

    return spotSection
  }
}
