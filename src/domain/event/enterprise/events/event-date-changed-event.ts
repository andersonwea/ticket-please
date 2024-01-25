import { DomainEvent } from '@/core/events/domain-event'
import { Event } from '../entities/event'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export class EventDateChangedEvent implements DomainEvent {
  public ocurredAt: Date
  public event: Event
  public date: Date

  constructor(event: Event, date: Date) {
    this.ocurredAt = new Date()
    this.event = event
    this.date = date
  }

  getAggregateId(): UniqueEntityId {
    return this.event.id
  }
}
