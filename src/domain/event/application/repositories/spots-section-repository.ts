import { SpotSection } from '../../enterprise/entities/spot-section'

export interface SpotsSectionsRepository {
  findManyBySectionId(sectionId: string): Promise<SpotSection[]>
}
