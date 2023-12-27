import { SpotsSectionRepository } from '@/domain/event/application/repositories/spots-section-repository'
import { SpotSection } from '@/domain/event/enterprise/entities/spot-section'

export class InMemorySpotsSectionRepository implements SpotsSectionRepository {
  items: SpotSection[] = []

  async findManyBySectionId(sectionId: string): Promise<SpotSection[]> {
    const spotsSection = this.items.filter(
      (item) => item.id.toString() === sectionId,
    )

    return spotsSection
  }
}
