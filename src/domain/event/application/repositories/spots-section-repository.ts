import { SpotSection } from '../../enterprise/entities/spot-section'

export interface SpotsSectionRepository {
  create(spotSection: SpotSection): Promise<void>
  findById(id: string): Promise<SpotSection | null>
  findManyBySectionId(sectionId: string): Promise<SpotSection[]>
  findManyPublishedBySectionId(sectionId: string): Promise<SpotSection[]>
  saveMany(spotSections: SpotSection[]): Promise<void>
}
