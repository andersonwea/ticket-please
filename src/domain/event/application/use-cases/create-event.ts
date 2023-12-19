import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resourse-not-found-error'
import { EventsRepository } from '../repositories/events-repository'
import { PartnersRepository } from '../repositories/partners-repository'
import { Event } from '../../enterprise/entities/event'

interface CreateEventUseCaseRequest {
  name: string
  description: string | null
  date: Date
  partnerId: string
}

type CreateEventUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    event: Event
  }
>

export class CreateEventUseCase {
  constructor(
    private eventsRepository: EventsRepository,
    private partnersRepository: PartnersRepository,
  ) {}

  async execute({
    name,
    description,
    date,
    partnerId,
  }: CreateEventUseCaseRequest): Promise<CreateEventUseCaseResponse> {
    const partner = await this.partnersRepository.findById(partnerId)

    if (!partner) {
      return left(new ResourceNotFoundError())
    }

    const event = partner.createEvent({
      name,
      description,
      date,
    })

    await this.eventsRepository.create(event)

    return right({
      event,
    })
  }
}
