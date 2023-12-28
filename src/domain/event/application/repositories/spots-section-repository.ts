import { SpotSection } from '../../enterprise/entities/spot-section'

export interface SpotsSectionRepository {
  create(spotSection: SpotSection): Promise<void>
  findManyBySectionId(sectionId: string): Promise<SpotSection[]>
  findManyPublishedBySectionId(sectionId: string): Promise<SpotSection[]>
}
