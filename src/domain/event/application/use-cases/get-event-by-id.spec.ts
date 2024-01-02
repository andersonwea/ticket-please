import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { GetEventByIdUseCase } from './get-event-by-id'
import { makeEvent } from 'test/factories/make-event'

let inMemoryEventsRepository: InMemoryEventsRepository
let sut: GetEventByIdUseCase

describe('Create Event Use Case', () => {
  beforeEach(() => {
    inMemoryEventsRepository = new InMemoryEventsRepository()
    sut = new GetEventByIdUseCase(inMemoryEventsRepository)
  })

  it('should be able to get event', async () => {
    const event = makeEvent()

    await inMemoryEventsRepository.create(event)

    const result = await sut.execute({
      eventId: event.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryEventsRepository.items[0]).toEqual(event)
  })
})
