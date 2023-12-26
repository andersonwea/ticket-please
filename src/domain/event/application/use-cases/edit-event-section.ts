import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resourse-not-found-error'
import { EventSection } from '../../enterprise/entities/event-section'
import { EventSectionsRepository } from '../repositories/event-sections-repository'
import { EventsRepository } from '../repositories/events-repository'
import { SpotsSectionsRepository } from '../repositories/spots-section-repository'
import { SpotSectionList } from '../../enterprise/entities/spot-section-list'
import { Spot } from '../../enterprise/entities/spot'
import {
  SpotSection,
  SpotSectionProps,
} from '../../enterprise/entities/spot-section'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EventSectionList } from '../../enterprise/entities/event-section-list'

interface EditEventSectionUseCaseRequest {
  name: string
  description: string | null
  totalSpots: number
  price: number
  sectionId: string
  partnerId: string
}

type EditEventSectionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    eventSection: EventSection
  }
>

export class EditEventSectionUseCase {
  constructor(
    private eventSectionsRepository: EventSectionsRepository,
    private eventsRepository: EventsRepository,
    private spotsSectionRepository: SpotsSectionsRepository,
  ) {}

  async execute({
    name,
    description,
    totalSpots,
    price,
    sectionId,
    partnerId,
  }: EditEventSectionUseCaseRequest): Promise<EditEventSectionUseCaseResponse> {
    const eventSection = await this.eventSectionsRepository.findById(sectionId)

    if (!eventSection) {
      return left(new ResourceNotFoundError())
    }

    const event = await this.eventsRepository.findById(
      eventSection.eventId.toString(),
    )

    if (event?.partnerId.toString() !== partnerId) {
      return left(new NotAllowedError())
    }

    if (event.isPublished) {
      return left(new NotAllowedError())
    }

    const currentEventSections =
      await this.eventSectionsRepository.findManyByEventId(event.id.toString())

    const currentSpots =
      await this.spotsSectionRepository.findManyBySectionId(sectionId)

    const eventSectionsList = new EventSectionList(currentEventSections)
    const spotsSectionList = new SpotSectionList(currentSpots)

    const spots: Spot<SpotSectionProps>[] = []

    for (let i = 0; i < totalSpots; i++) {
      const spot = SpotSection.create({
        sectionId: new UniqueEntityId(sectionId),
      })

      spots.push(spot)
    }

    spotsSectionList.update(spots)

    eventSection.name = name
    eventSection.description = description
    eventSection.price = price
    eventSection.spots = spotsSectionList
    eventSection.totalSpots = totalSpots

    event.sections = eventSectionsList

    return right({
      eventSection,
    })
  }
}
