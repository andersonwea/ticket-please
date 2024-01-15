import { InMemoryEventsRepository } from '@/test/repositories/in-memory-events-repository'
import { CreateEventUseCase } from './create-event'
import { InMemoryPartnersRepository } from '@/test/repositories/in-memory-partners-repository'
import { makePartner } from '@/test/factories/make-partner'

let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryPartnersRepository: InMemoryPartnersRepository
let sut: CreateEventUseCase

describe('Create Event Use Case', () => {
  beforeEach(() => {
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryPartnersRepository = new InMemoryPartnersRepository()
    sut = new CreateEventUseCase(
      inMemoryEventsRepository,
      inMemoryPartnersRepository,
    )
  })

  it('should be able to create a new event', async () => {
    const partner = makePartner()

    await inMemoryPartnersRepository.create(partner)

    const result = await sut.execute({
      name: 'Event Name',
      description: 'Event Description',
      date: new Date(2023, 0, 10),
      partnerId: partner.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryEventsRepository.items[0].name).toEqual('Event Name')
  })
})
