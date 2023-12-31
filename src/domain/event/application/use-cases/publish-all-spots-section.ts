import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resourse-not-found-error'
import { SpotSection } from '../../enterprise/entities/spot-section'
import { SpotsSectionRepository } from '../repositories/spots-section-repository'
import { EventSectionsRepository } from '../repositories/event-sections-repository'
import { SpotSectionList } from '../../enterprise/entities/spot-section-list'

interface PublishAllSpotsSectionUseCaseRequest {
  sectionId: string
}

type PublishAllSpotsSectionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    spotsSection: SpotSection[]
  }
>

export class PublishAllSpotsSectionUseCase {
  constructor(
    private eventSections: EventSectionsRepository,
    private spotsSectionRepository: SpotsSectionRepository,
  ) {}

  async execute({
    sectionId,
  }: PublishAllSpotsSectionUseCaseRequest): Promise<PublishAllSpotsSectionUseCaseResponse> {
    const eventSection = await this.eventSections.findById(sectionId)
    const spotsSection =
      await this.spotsSectionRepository.findManyBySectionId(sectionId)

    if (!eventSection) {
      return left(new ResourceNotFoundError())
    }

    const currentSpotsSection =
      await this.spotsSectionRepository.findManyBySectionId(sectionId)

    const spotsSectionList = new SpotSectionList(currentSpotsSection)

    for (let i = 0; i < eventSection.totalSpots; i++) {
      spotsSection[i].isPublished = true
    }

    spotsSectionList.update(spotsSection)

    eventSection.spots = spotsSectionList

    await this.spotsSectionRepository.saveMany(spotsSection)

    return right({
      spotsSection,
    })
  }
}
