import { SpotSection } from '../../enterprise/entities/spot-section'

export interface SpotsSectionRepository {
  findManyBySectionId(sectionId: string): Promise<SpotSection[]>
}
