import { Section, SectionProps } from '../../enterprise/entities/section'

export interface SectionsRepository {
  create(section: Section<SectionProps>): Promise<void>
  findManyByEventId(id: string): Promise<Section<SectionProps>[]>
}
