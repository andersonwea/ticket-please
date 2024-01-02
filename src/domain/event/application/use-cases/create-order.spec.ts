import { InMemoryEventsRepository } from '@/test/repositories/in-memory-events-repository'
import { CreateEventUseCase } from './create-event'
import { InMemoryPartnersRepository } from '@/test/repositories/in-memory-partners-repository'
import { makePartner } from '@/test/factories/make-partner'
import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'
import { InMemorySpotsReservationRepository } from '@/test/repositories/in-memory-spots-reservation-repository'
import { InMemorySpotsSectionRepository } from '@/test/repositories/in-memory-spots-sections-repository'
import { StripeGateway } from '@/domain/infra/gateways/stripe-gateway'
import { CreateOrderUseCase } from './create-order'
import { InMemoryCustomersRepository } from '@/test/repositories/in-memory-customer-repository'
import { makeEvent } from '@/test/factories/make-event'
import { makeEventSection } from '@/test/factories/make-event-section'
import { makeCustomer } from '@/test/factories/make-customer'
import { InMemoryEventSectionsRepository } from '@/test/repositories/in-memory-event-sections-repository'
import { OrderStatus } from '../../enterprise/entities/order'
import { makeSpotSection } from '@/test/factories/make-spots-section'

let inMemoryPartnersRepository: InMemoryPartnersRepository
let inMemoryOrdersRepository: InMemoryOrdersRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemorySpotsReservationRepository: InMemorySpotsReservationRepository
let inMemorySpotsSectionRepository: InMemorySpotsSectionRepository
let inMemoryEventSectionsRepository: InMemoryEventSectionsRepository
let inMemoryCustomersRepository: InMemoryCustomersRepository
let paymentGateway: StripeGateway
let sut: CreateOrderUseCase

const customer = makeCustomer()
const partner = makePartner()
const event = makeEvent({
  partnerId: partner.id,
})
const eventSection = makeEventSection({
  eventId: event.id,
})

describe('Create Order Use Case', async () => {
  beforeEach(async () => {
    inMemoryPartnersRepository = new InMemoryPartnersRepository()
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemorySpotsReservationRepository =
      new InMemorySpotsReservationRepository()
    inMemorySpotsSectionRepository = new InMemorySpotsSectionRepository()
    inMemoryEventSectionsRepository = new InMemoryEventSectionsRepository()
    inMemoryCustomersRepository = new InMemoryCustomersRepository()
    paymentGateway = new StripeGateway()
    sut = new CreateOrderUseCase(
      inMemoryOrdersRepository,
      inMemoryCustomersRepository,
      inMemoryEventsRepository,
      inMemorySpotsSectionRepository,
      inMemorySpotsReservationRepository,
      inMemoryEventSectionsRepository,
      paymentGateway,
    )

    await inMemoryCustomersRepository.create(customer)
    await inMemoryEventsRepository.create(event)
    await inMemoryEventSectionsRepository.create(eventSection)
    await inMemoryPartnersRepository.create(partner)

    for (let i = 0; i < eventSection.totalSpots; i++) {
      await inMemorySpotsSectionRepository.create(
        makeSpotSection({
          sectionId: eventSection.id,
        }),
      )
    }
  })

  it('should be able to create a sucess order', async () => {
    const result = await sut.execute({
      eventId: event.id.toString(),
      customerId: customer.id.toString(),
      sectionId: eventSection.id.toString(),
      spotSectionId: inMemorySpotsSectionRepository.items[0].id.toString(),
      cardToken: 'tok_visa',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryOrdersRepository.items[0].status).toEqual(OrderStatus.PAID)
    expect(inMemoryOrdersRepository.items[0].customerId).toEqual(customer.id)
    expect(inMemorySpotsReservationRepository.items).toHaveLength(1)
    expect(inMemorySpotsSectionRepository.items[0].isReserved).toBe(true)
  })

  it('should be able to create a failed order payment', async () => {
    const result = await sut.execute({
      eventId: event.id.toString(),
      customerId: customer.id.toString(),
      sectionId: eventSection.id.toString(),
      spotSectionId: inMemorySpotsSectionRepository.items[0].id.toString(),
      cardToken: 'invalid_token',
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryOrdersRepository.items[0].status).toEqual(
      OrderStatus.CANCELLED,
    )
    expect(inMemorySpotsReservationRepository.items).toHaveLength(0)
    expect(inMemorySpotsSectionRepository.items[0].isReserved).toBe(false)
  })
})
