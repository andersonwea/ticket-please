import { Either, right } from '@/core/either'
import { SpotSection } from '../../enterprise/entities/spot-section'
import { SpotsSectionRepository } from '../repositories/spots-section-repository'

interface ListPublishedSpotsSectionUseCaseRequest {
  eventSectionId: string
}

type ListPublishedSpotsSectionUseCaseResponse = Either<
  null,
  {
    spotsSection: SpotSection[]
  }
>

export class ListPublishedSpotsSectionUseCase {
  constructor(private spotsSectionRepository: SpotsSectionRepository) {}

  async execute({
    eventSectionId,
  }: ListPublishedSpotsSectionUseCaseRequest): Promise<ListPublishedSpotsSectionUseCaseResponse> {
    const spotsSection =
      await this.spotsSectionRepository.findManyPublishedBySectionId(
        eventSectionId,
      )

    return right({
      spotsSection,
    })
  }
}
