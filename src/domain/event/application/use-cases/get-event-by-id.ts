import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resourse-not-found-error'
import { Event } from '../../enterprise/entities/event'
import { EventsRepository } from '../repositories/events-repository'

interface GetEventByIdUseCaseRequest {
  eventId: string
}

type GetEventByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    event: Event
  }
>

export class GetEventByIdUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    eventId,
  }: GetEventByIdUseCaseRequest): Promise<GetEventByIdUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return left(new ResourceNotFoundError())
    }

    return right({
      event,
    })
  }
}
