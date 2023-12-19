import { PaginationParams } from '@/core/repositories/pagination-params'
import { Event } from '../../enterprise/entities/event'

export interface EventsRepository {
  create(event: Event): Promise<void>
  findManyUpcoming(params: PaginationParams): Promise<Event[]>
}