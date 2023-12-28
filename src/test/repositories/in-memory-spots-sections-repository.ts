import { SpotsSectionRepository } from '@/domain/event/application/repositories/spots-section-repository'
import { SpotSection } from '@/domain/event/enterprise/entities/spot-section'

export class InMemorySpotsSectionRepository implements SpotsSectionRepository {
  items: SpotSection[] = []

  async create(spotSection: SpotSection): Promise<void> {
    this.items.push(spotSection)
  }

  async findManyBySectionId(sectionId: string): Promise<SpotSection[]> {
    const spotsSection = this.items.filter(
      (item) => item.sectionId.toString() === sectionId,
    )

    return spotsSection
  }

  async findManyPublishedBySectionId(
    sectionId: string,
  ): Promise<SpotSection[]> {
    const spotsSection = this.items.filter(
      (item) => item.sectionId.toString() === sectionId && item.isPublished,
    )

    return spotsSection
  }
}
