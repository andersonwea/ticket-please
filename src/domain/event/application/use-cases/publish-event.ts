import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resourse-not-found-error'
import { Event } from '../../enterprise/entities/event'
import { EventsRepository } from '../repositories/events-repository'

interface PublishEventUseCaseRequest {
  eventId: string
}

type PublishEventUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    event: Event
  }
>

export class PublishEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    eventId,
  }: PublishEventUseCaseRequest): Promise<PublishEventUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return left(new ResourceNotFoundError())
    }

    event.isPublished = true

    return right({
      event,
    })
  }
}
