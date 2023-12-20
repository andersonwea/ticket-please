import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resourse-not-found-error'
import { EventSection } from '../../enterprise/entities/event-section'
import { EventSectionsRepository } from '../repositories/event-sections-repository'
import { EventsRepository } from '../repositories/events-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EventSectionList } from '../../enterprise/entities/event-section-list'

interface CreateEventSectionUseCaseRequest {
  name: string
  description: string | null
  totalSpots: number
  price: number
  eventId: string
}

type CreateEventSectionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    eventSection: EventSection
  }
>

export class CreateEventSectionUseCase {
  constructor(
    private eventSectionsRepository: EventSectionsRepository,
    private eventsRepository: EventsRepository,
  ) {}

  async execute({
    name,
    description,
    totalSpots,
    price,
    eventId,
  }: CreateEventSectionUseCaseRequest): Promise<CreateEventSectionUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return left(new ResourceNotFoundError())
    }

    const currentEventSections =
      await this.eventSectionsRepository.findManyByEventId(eventId)

    const eventSection = EventSection.create({
      description,
      name,
      price,
      totalSpots,
      eventId: new UniqueEntityId(eventId),
    })

    const eventSectionList = new EventSectionList(currentEventSections)

    eventSectionList.update([eventSection])
    event.sections = eventSectionList

    await this.eventSectionsRepository.create(eventSection)

    return right({
      eventSection,
    })
  }
}
