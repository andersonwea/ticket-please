import { PaginationParams } from '@/core/repositories/pagination-params'
import { EventsRepository } from '@/domain/event/application/repositories/events-repository'
import { Event } from '@/domain/event/enterprise/entities/event'

export class InMemoryEventsRepository implements EventsRepository {
  items: Event[] = []

  async create(event: Event): Promise<void> {
    this.items.push(event)
  }

  async findManyUpcoming({ page }: PaginationParams): Promise<Event[]> {
    const events = this.items
      .filter((event) => event.date > new Date())
      .filter((event) => event.isPublished)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice((page - 1) * 12, page * 12)

    return events
  }

  async findById(id: string): Promise<Event | null> {
    const event = this.items.find((item) => item.id.toString() === id)

    if (!event) {
      return null
    }

    return event
  }

  async save(event: Event): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === event.id)

    this.items[itemIndex] = event
  }
}
