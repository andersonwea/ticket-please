import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resourse-not-found-error'
import { EventsRepository } from '../repositories/events-repository'
import { Event } from '../../enterprise/entities/event'

interface EditEventUseCaseRequest {
  name: string
  description: string | null
  date: Date
  partnerId: string
  eventId: string
}

type EditEventUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    event: Event
  }
>

export class EditEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    name,
    description,
    date,
    partnerId,
    eventId,
  }: EditEventUseCaseRequest): Promise<EditEventUseCaseResponse> {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return left(new ResourceNotFoundError())
    }

    if (event.partnerId.toString() !== partnerId) {
      return left(new NotAllowedError())
    }

    event.name = name
    event.description = description
    event.date = date

    await this.eventsRepository.save(event)

    return right({
      event,
    })
  }
}
