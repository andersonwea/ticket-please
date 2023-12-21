import { WatchedList } from '@/core/entities/watched-list'
import { SpotSection } from './spot-section'

export class SpotSectionList extends WatchedList<SpotSection> {
  compareItems(a: SpotSection, b: SpotSection): boolean {
    return a.id.equals(b.id)
  }
}
