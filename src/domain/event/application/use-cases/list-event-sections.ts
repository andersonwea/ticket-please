import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resourse-not-found-error'
import { EventSection } from '../../enterprise/entities/event-section'
import { EventSectionsRepository } from '../repositories/event-sections-repository'
import { EventsRepository } from '../repositories/events-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface ListEventSectionsUseCaseRequest {
  eventId: string
}

type ListEventSectionsUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    eventSections: EventSection[]
  }
>

export class ListEventSectionsUseCase {
  constructor(
    private eventSectionsRepository: EventSectionsRepository,
    private eventsRepository: EventsRepository,
  ) {}

  async execute({
    eventId,
  }: ListEventSectionsUseCaseRequest): Promise<ListEventSectionsUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return left(new ResourceNotFoundError())
    }

    if (!event.isPublished) {
      return left(new NotAllowedError())
    }

    const eventSections =
      await this.eventSectionsRepository.findManyByEventId(eventId)

    return right({
      eventSections,
    })
  }
}
