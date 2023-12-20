import { EventSectionsRepository } from '@/domain/event/application/repositories/event-sections-repository'
import { EventSection } from '@/domain/event/enterprise/entities/event-section'

export class InMemoryEventSectionsRepository
  implements EventSectionsRepository
{
  items: EventSection[] = []

  async create(eventSection: EventSection): Promise<void> {
    this.items.push(eventSection)
  }

  async findManyByEventId(eventId: string): Promise<EventSection[]> {
    const eventSections = this.items.filter(
      (eventSection) => eventSection.eventId.toString() === eventId,
    )

    return eventSections
  }
}
