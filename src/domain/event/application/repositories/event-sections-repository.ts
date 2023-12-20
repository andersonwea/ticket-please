import { EventSection } from '../../enterprise/entities/event-section'

export interface EventSectionsRepository {
  create(eventSection: EventSection): Promise<void>
  findManyByEventId(eventId: string): Promise<EventSection[]>
}
