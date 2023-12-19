import { Event } from '../../enterprise/entities/event'

export interface EventsRepository {
  create(event: Event): Promise<void>
}
