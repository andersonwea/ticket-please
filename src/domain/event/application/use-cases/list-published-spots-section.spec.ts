import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { makeEvent } from 'test/factories/make-event'
import { InMemoryEventSectionsRepository } from 'test/repositories/in-memory-event-sections-repository'
import { makeEventSection } from 'test/factories/make-event-section'
import { InMemorySpotsSectionRepository } from 'test/repositories/in-memory-spots-sections-repository'
import { ListPublishedSpotsSectionUseCase } from './list-published-spots-section'
import { makeSpotSection } from 'test/factories/make-spots-section'

let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventSectionsRepository: InMemoryEventSectionsRepository
let inMemorySpotsSectionRepository: InMemorySpotsSectionRepository
let sut: ListPublishedSpotsSectionUseCase

describe('List Published Spots Section Use Case', () => {
  beforeEach(() => {
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventSectionsRepository = new InMemoryEventSectionsRepository()
    inMemorySpotsSectionRepository = new InMemorySpotsSectionRepository()
    sut = new ListPublishedSpotsSectionUseCase(inMemorySpotsSectionRepository)
  })

  it('should be able to list published spots section', async () => {
    const event = makeEvent({ isPublished: true })
    const eventSection = makeEventSection({ eventId: event.id })

    await inMemoryEventsRepository.create(event)
    await inMemoryEventSectionsRepository.create(eventSection)

    for (let i = 0; i < eventSection.totalSpots; i++) {
      await inMemorySpotsSectionRepository.create(
        makeSpotSection({
          sectionId: eventSection.id,
          isPublished: true,
        }),
      )
    }

    const result = await sut.execute({
      eventSectionId: eventSection.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.spotsSection).toHaveLength(eventSection.totalSpots)
  })
})
