import { Section } from '../../enterprise/entities/section'

export interface SectionsRepository {
  create(section: Section): Promise<void>
  findManyByEventId(id: string): Promise<Section[]>
}
