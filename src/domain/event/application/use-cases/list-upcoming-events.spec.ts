import { InMemoryEventsRepository } from '@/test/repositories/in-memory-events-repository'
import { makePartner } from '@/test/factories/make-partner'
import { ListUpcomingEventsUseCase } from './list-upcoming-events'
import { makeEvent } from '@/test/factories/make-event'

let inMemoryEventsRepository: InMemoryEventsRepository
let sut: ListUpcomingEventsUseCase

describe('List Upcoming Events Use Case', () => {
  beforeEach(() => {
    inMemoryEventsRepository = new InMemoryEventsRepository()
    sut = new ListUpcomingEventsUseCase(inMemoryEventsRepository)
  })

  it('should be able to list upcoming events', async () => {
    await inMemoryEventsRepository.create(
      makeEvent({ date: new Date(2024, 0, 15) }),
    )

    await inMemoryEventsRepository.create(
      makeEvent({ date: new Date(2024, 0, 10) }),
    )

    await inMemoryEventsRepository.create(
      makeEvent({ date: new Date(2023, 11, 15) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.events).toEqual([
      expect.objectContaining({ date: new Date(2024, 0, 10) }),
      expect.objectContaining({ date: new Date(2024, 0, 15) }),
    ])
  })

  it('should be able to list upcoming events by page', async () => {
    for (let i = 1; i <= 14; i++) {
      await inMemoryEventsRepository.create(
        makeEvent({
          date: new Date(2024, 0, i),
        }),
      )
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.events).toHaveLength(2)
  })
})
