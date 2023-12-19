import { Either, right } from '@/core/either'
import { Event } from '../../enterprise/entities/event'
import { EventsRepository } from '../repositories/events-repository'

interface ListUpcomingEventsUseCaseRequest {
  page: number
}

type ListUpcomingEventsUseCaseResponse = Either<
  null,
  {
    events: Event[]
  }
>

export class ListUpcomingEventsUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    page,
  }: ListUpcomingEventsUseCaseRequest): Promise<ListUpcomingEventsUseCaseResponse> {
    const events = await this.eventsRepository.findManyUpcoming({ page })

    return right({
      events,
    })
  }
}
