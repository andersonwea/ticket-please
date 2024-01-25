import { makeCustomer } from '@/test/factories/make-customer'
import { makeEvent } from '@/test/factories/make-event'
import { makeEventSection } from '@/test/factories/make-event-section'
import { makePartner } from '@/test/factories/make-partner'
import { InMemoryCustomersRepository } from '@/test/repositories/in-memory-customer-repository'
import {
  SendEmailUseCase,
  SendEmailUseCaseRequest,
  SendEmailUseCaseResponse,
} from '../application/use-cases/send-email'
import { MailtrapGateway } from '@/infra/gateways/mailtrap-gateway'
import { InMemoryEmailsRepository } from '@/test/repositories/in-memory-emails-repository'
import { MockInstance } from 'vitest'
import { InMemoryEventsRepository } from '@/test/repositories/in-memory-events-repository'
import { InMemoryEventSectionsRepository } from '@/test/repositories/in-memory-event-sections-repository'
import { makeOrder } from '@/test/factories/make-order'
import { makeSpotSection } from '@/test/factories/make-spots-section'
import { InMemorySpotsSectionRepository } from '@/test/repositories/in-memory-spots-sections-repository'
import { OrderStatus } from '@/domain/event/enterprise/entities/order'
import { waitFor } from '@/test/utils/wait-for'
import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'
import { OnEventDateChanged } from './on-event-date-changed'
import { InMemorySpotsReservationRepository } from '@/test/repositories/in-memory-spots-reservation-repository'
import { makeSpotReservation } from '@/test/factories/make-spot-reservation'

let inMemoryCustomersRepository: InMemoryCustomersRepository
let inMemoryEmailsRepository: InMemoryEmailsRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventSectionsRepository: InMemoryEventSectionsRepository
let inMemorySpotsSectionRepository: InMemorySpotsSectionRepository
let inMemoryOrdersRepository: InMemoryOrdersRepository
let inMemorySpotsReservationRepository: InMemorySpotsReservationRepository
let mailtrapGateway: MailtrapGateway
let sendEmailUseCase: SendEmailUseCase

let sendEventDateChangedEmailSpy: MockInstance<
  [SendEmailUseCaseRequest],
  Promise<SendEmailUseCaseResponse>
>

describe('On Event Date Changed', () => {
  beforeEach(() => {
    inMemoryCustomersRepository = new InMemoryCustomersRepository()
    inMemoryEmailsRepository = new InMemoryEmailsRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventSectionsRepository = new InMemoryEventSectionsRepository()
    inMemorySpotsSectionRepository = new InMemorySpotsSectionRepository()
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    inMemorySpotsReservationRepository =
      new InMemorySpotsReservationRepository()
    mailtrapGateway = new MailtrapGateway()
    sendEmailUseCase = new SendEmailUseCase(
      inMemoryEmailsRepository,
      mailtrapGateway,
    )

    sendEventDateChangedEmailSpy = vi.spyOn(sendEmailUseCase, 'execute')

    new OnEventDateChanged(
      inMemorySpotsReservationRepository,
      inMemoryCustomersRepository,
      sendEmailUseCase,
    )
  })

  it('should send email to all customer when event date changed', async () => {
    const partner = makePartner()
    const customer = makeCustomer()
    const event = makeEvent({ partnerId: partner.id })
    const eventSection = makeEventSection({ eventId: event.id })
    const spotsSection = makeSpotSection({
      sectionId: eventSection.id,
      isPublished: true,
    })

    inMemoryCustomersRepository.create(customer)
    inMemoryEventsRepository.create(event)
    inMemoryEventSectionsRepository.create(eventSection)
    inMemorySpotsSectionRepository.create(spotsSection)

    const order = makeOrder({
      customerId: customer.id,
      sectionSpotId: spotsSection.id,
      status: OrderStatus.PAID,
    })

    const reservation = makeSpotReservation({
      customerId: customer.id,
      eventId: event.id,
      spotId: spotsSection.id,
    })

    order.status = OrderStatus.PAID

    inMemoryOrdersRepository.create(order)
    inMemorySpotsReservationRepository.create(reservation)

    event.date = new Date('2025-01-01')

    inMemoryEventsRepository.save(event)

    await waitFor(() => {
      expect(sendEventDateChangedEmailSpy).toHaveBeenCalled()
    })
  })
})
