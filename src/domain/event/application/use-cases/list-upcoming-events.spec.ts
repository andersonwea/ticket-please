import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { ListUpcomingEventsUseCase } from './list-upcoming-events'
import { makeEvent } from 'test/factories/make-event'
import { faker } from '@faker-js/faker'

let inMemoryEventsRepository: InMemoryEventsRepository
let sut: ListUpcomingEventsUseCase

describe('List Upcoming Events Use Case', () => {
  beforeEach(() => {
    inMemoryEventsRepository = new InMemoryEventsRepository()
    sut = new ListUpcomingEventsUseCase(inMemoryEventsRepository)
  })

  it('should be able to list upcoming published events', async () => {
    await inMemoryEventsRepository.create(
      makeEvent({ date: new Date(2024, 0, 15), isPublished: true }),
    )

    await inMemoryEventsRepository.create(
      makeEvent({ date: faker.date.past(), isPublished: true }),
    )

    await inMemoryEventsRepository.create(
      makeEvent({ date: faker.date.future(), isPublished: true }),
    )

    await inMemoryEventsRepository.create(
      makeEvent({ date: faker.date.future(), isPublished: false }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.events).toEqual([
      expect.objectContaining({ date: expect.any(Date) }),
    ])
  })

  it('should be able to list upcoming events by page', async () => {
    for (let i = 1; i <= 14; i++) {
      await inMemoryEventsRepository.create(
        makeEvent({
          date: faker.date.future(),
          isPublished: true,
        }),
      )
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.events).toHaveLength(2)
  })
})
