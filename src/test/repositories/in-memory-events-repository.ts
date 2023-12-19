import { EventsRepository } from '@/domain/event/application/repositories/events-repository'
import { Event } from '@/domain/event/enterprise/entities/event'

export class InMemoryEventsRepository implements EventsRepository {
  items: Event[] = []

  async create(event: Event): Promise<void> {
    this.items.push(event)
  }
}
