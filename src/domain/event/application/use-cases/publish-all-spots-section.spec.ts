import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { makeEvent } from 'test/factories/make-event'
import { expect } from 'vitest'
import { InMemorySpotsSectionRepository } from 'test/repositories/in-memory-spots-sections-repository'
import { PublishAllSpotsSectionUseCase } from './publish-all-spots-section'
import { InMemoryEventSectionsRepository } from 'test/repositories/in-memory-event-sections-repository'
import { makeEventSection } from 'test/factories/make-event-section'
import { makeSpotSection } from 'test/factories/make-spots-section'

let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventSectionsRepository: InMemoryEventSectionsRepository
let inMemorySpotsSectionRepository: InMemorySpotsSectionRepository
let sut: PublishAllSpotsSectionUseCase

describe('Publish All Spots Section Use Case', () => {
  beforeEach(() => {
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventSectionsRepository = new InMemoryEventSectionsRepository()
    inMemorySpotsSectionRepository = new InMemorySpotsSectionRepository()
    sut = new PublishAllSpotsSectionUseCase(
      inMemoryEventSectionsRepository,
      inMemorySpotsSectionRepository,
    )
  })

  it('should be able to publish all spots section', async () => {
    const event = makeEvent()
    const eventSection = makeEventSection({
      eventId: event.id,
    })

    for (let i = 0; i < eventSection.totalSpots; i++) {
      await inMemorySpotsSectionRepository.create(
        makeSpotSection({
          sectionId: eventSection.id,
        }),
      )
    }

    await inMemoryEventsRepository.create(event)
    await inMemoryEventSectionsRepository.create(eventSection)

    const result = await sut.execute({
      sectionId: eventSection.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemorySpotsSectionRepository.items[0].isPublished).toBe(true)
  })
})
