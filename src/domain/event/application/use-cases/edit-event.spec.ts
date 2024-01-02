import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { EditEventUseCase } from './edit-event'
import { makeEvent } from 'test/factories/make-event'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { expect } from 'vitest'

let inMemoryEventsRepository: InMemoryEventsRepository
let sut: EditEventUseCase

describe('Edit Event Use Case', () => {
  beforeEach(() => {
    inMemoryEventsRepository = new InMemoryEventsRepository()
    sut = new EditEventUseCase(inMemoryEventsRepository)
  })

  it('should be able to edit a event', async () => {
    const event = makeEvent()

    await inMemoryEventsRepository.create(event)

    const result = await sut.execute({
      name: 'New Event Name',
      description: 'New Event Description',
      date: new Date(2024, 0, 30),
      partnerId: event.partnerId.toString(),
      eventId: event.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryEventsRepository.items[0].name).toEqual('New Event Name')
  })

  it('should not be able to edit a another partner event', async () => {
    const event = makeEvent()

    await inMemoryEventsRepository.create(event)

    const result = await sut.execute({
      name: 'New Event Name',
      description: 'New Event Description',
      date: new Date(2024, 0, 30),
      partnerId: 'another-partner-id',
      eventId: event.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
