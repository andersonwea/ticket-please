import { WatchedList } from '@/core/entities/watched-list'
import { EventSection } from './event-section'

export class EventSectionList extends WatchedList<EventSection> {
  compareItems(a: EventSection, b: EventSection): boolean {
    return a.id.equals(b.id)
  }
}
