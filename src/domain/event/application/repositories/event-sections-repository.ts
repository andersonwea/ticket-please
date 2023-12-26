import { EventSection } from '../../enterprise/entities/event-section'

export interface EventSectionsRepository {
  create(eventSection: EventSection): Promise<void>
  findById(id: string): Promise<EventSection | null>
  findManyByEventId(eventId: string): Promise<EventSection[]>
}
