import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  SpotSection,
  SpotSectionProps,
} from '@/domain/event/enterprise/entities/spot-section'

export function makeSpotSection(
  override: Partial<SpotSectionProps> = {},
  id?: UniqueEntityId,
) {
  const spotSection = SpotSection.create(
    {
      sectionId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return spotSection
}
