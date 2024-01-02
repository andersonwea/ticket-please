import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryEventSectionsRepository } from 'test/repositories/in-memory-event-sections-repository'
import { makeEvent } from 'test/factories/make-event'
import { InMemorySpotsSectionRepository } from 'test/repositories/in-memory-spots-sections-repository'
import { EditEventSectionUseCase } from './edit-event-section'
import { makeEventSection } from 'test/factories/make-event-section'

let inMemoryEventSectionsRepository: InMemoryEventSectionsRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemorySpotsSectionRepository: InMemorySpotsSectionRepository
let sut: EditEventSectionUseCase

describe('Create Event Section Use Case', () => {
  beforeEach(() => {
    inMemoryEventSectionsRepository = new InMemoryEventSectionsRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemorySpotsSectionRepository = new InMemorySpotsSectionRepository()
    sut = new EditEventSectionUseCase(
      inMemoryEventSectionsRepository,
      inMemoryEventsRepository,
      inMemorySpotsSectionRepository,
    )
  })

  it('should be able to edit event section', async () => {
    const event = makeEvent()
    const eventSection = makeEventSection({
      eventId: event.id,
    })

    await inMemoryEventsRepository.create(event)
    await inMemoryEventSectionsRepository.create(eventSection)

    const result = await sut.execute({
      name: 'New section name',
      totalSpots: 50,
      description: 'New section description',
      price: 1500,
      sectionId: eventSection.id.toString(),
      partnerId: event.partnerId.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryEventSectionsRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'New section name',
        totalSpots: 50,
      }),
    )
    expect(
      inMemoryEventSectionsRepository.items[0].spots.getItems(),
    ).toHaveLength(50)
    expect(inMemoryEventsRepository.items[0].totalSpots).toEqual(50)
    expect(inMemoryEventsRepository.items[0].totalSpotsLeft).toEqual(50)
  })
})
