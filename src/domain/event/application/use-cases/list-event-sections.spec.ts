import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { makeEvent } from 'test/factories/make-event'
import { InMemoryEventSectionsRepository } from 'test/repositories/in-memory-event-sections-repository'
import { ListEventSectionsUseCase } from './list-event-sections'
import { makeEventSection } from 'test/factories/make-event-section'

let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventSectionsRepository: InMemoryEventSectionsRepository
let sut: ListEventSectionsUseCase

describe('List Event Sections Use Case', () => {
  beforeEach(() => {
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventSectionsRepository = new InMemoryEventSectionsRepository()
    sut = new ListEventSectionsUseCase(
      inMemoryEventSectionsRepository,
      inMemoryEventsRepository,
    )
  })

  it('should be able to list event sections', async () => {
    const event = makeEvent({ isPublished: true })

    await inMemoryEventsRepository.create(event)

    await inMemoryEventSectionsRepository.create(
      makeEventSection({
        eventId: event.id,
      }),
    )

    await inMemoryEventSectionsRepository.create(
      makeEventSection({
        eventId: event.id,
      }),
    )

    const result = await sut.execute({
      eventId: event.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryEventSectionsRepository.items).toEqual([
      expect.objectContaining({
        eventId: event.id,
      }),
      expect.objectContaining({
        eventId: event.id,
      }),
    ])
  })
})
