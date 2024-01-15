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
import { OnOrderPaid } from './on-order-paid'
import { InMemoryEventsRepository } from '@/test/repositories/in-memory-events-repository'
import { InMemoryEventSectionsRepository } from '@/test/repositories/in-memory-event-sections-repository'
import { makeOrder } from '@/test/factories/make-order'
import { makeSpotSection } from '@/test/factories/make-spots-section'
import { InMemorySpotsSectionRepository } from '@/test/repositories/in-memory-spots-sections-repository'
import { OrderStatus } from '@/domain/event/enterprise/entities/order'
import { waitFor } from '@/test/utils/wait-for'
import { InMemoryOrdersRepository } from '@/test/repositories/in-memory-orders-repository'

let inMemoryCustomersRepository: InMemoryCustomersRepository
let inMemoryEmailsRepository: InMemoryEmailsRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventSectionsRepository: InMemoryEventSectionsRepository
let inMemorySpotsSectionRepository: InMemorySpotsSectionRepository
let inMemoryOrdersRepository: InMemoryOrdersRepository
let mailtrapGateway: MailtrapGateway
let sendEmailUseCase: SendEmailUseCase

let sendOrderPaidEmailSpy: MockInstance<
  [SendEmailUseCaseRequest],
  Promise<SendEmailUseCaseResponse>
>

describe('On Order Paid', () => {
  beforeEach(() => {
    inMemoryCustomersRepository = new InMemoryCustomersRepository()
    inMemoryEmailsRepository = new InMemoryEmailsRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventSectionsRepository = new InMemoryEventSectionsRepository()
    inMemorySpotsSectionRepository = new InMemorySpotsSectionRepository()
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    mailtrapGateway = new MailtrapGateway()
    sendEmailUseCase = new SendEmailUseCase(
      inMemoryEmailsRepository,
      mailtrapGateway,
    )

    sendOrderPaidEmailSpy = vi.spyOn(sendEmailUseCase, 'execute')

    new OnOrderPaid(inMemoryCustomersRepository, sendEmailUseCase)
  })

  it('should send email when order is paid', async () => {
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

    order.status = OrderStatus.PAID

    inMemoryOrdersRepository.create(order)

    await waitFor(() => {
      expect(sendOrderPaidEmailSpy).toHaveBeenCalled()
    })
  })
})
