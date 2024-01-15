import { InMemoryEventsRepository } from '@/test/repositories/in-memory-events-repository'
import { makeEvent } from '@/test/factories/make-event'
import { expect } from 'vitest'
import { PublishEventUseCase } from './publish-event'

let inMemoryEventsRepository: InMemoryEventsRepository
let sut: PublishEventUseCase

describe('Publish Event Use Case', () => {
  beforeEach(() => {
    inMemoryEventsRepository = new InMemoryEventsRepository()
    sut = new PublishEventUseCase(inMemoryEventsRepository)
  })

  it('should be able to publish event', async () => {
    const event = makeEvent()

    await inMemoryEventsRepository.create(event)

    const result = await sut.execute({
      eventId: event.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryEventsRepository.items[0].isPublished).toBe(true)
  })
})
