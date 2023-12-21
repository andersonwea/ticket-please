import { PaginationParams } from '@/core/repositories/pagination-params'
import { Event } from '../../enterprise/entities/event'

export interface EventsRepository {
  create(event: Event): Promise<void>
  findManyUpcoming(params: PaginationParams): Promise<Event[]>
  findById(id: string): Promise<Event | null>
  save(event: Event): Promise<void>
}
