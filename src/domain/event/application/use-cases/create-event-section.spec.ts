import { InMemoryEventsRepository } from '@/test/repositories/in-memory-events-repository'
import { InMemoryEventSectionsRepository } from '@/test/repositories/in-memory-event-sections-repository'
import { CreateEventSectionUseCase } from './create-event-section'
import { makeEvent } from '@/test/factories/make-event'

let inMemoryEventSectionsRepository: InMemoryEventSectionsRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let sut: CreateEventSectionUseCase

describe('Create Event Section Use Case', () => {
  beforeEach(() => {
    inMemoryEventSectionsRepository = new InMemoryEventSectionsRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()
    sut = new CreateEventSectionUseCase(
      inMemoryEventSectionsRepository,
      inMemoryEventsRepository,
    )
  })

  it('should be able to create a new event section', async () => {
    const event = makeEvent()

    await inMemoryEventsRepository.create(event)

    const result = await sut.execute({
      name: 'VIP',
      description: null,
      price: 25000,
      totalSpots: 50,
      eventId: event.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryEventSectionsRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'VIP',
        totalSpots: 50,
      }),
    )
    expect(
      inMemoryEventSectionsRepository.items[0].spots.getItems(),
    ).toHaveLength(50)
    expect(inMemoryEventsRepository.items[0].sections.getItems()).toHaveLength(
      1,
    )
    expect(inMemoryEventsRepository.items[0].totalSpots).toEqual(50)
    expect(inMemoryEventsRepository.items[0].totalSpotsLeft).toEqual(50)
  })
})
