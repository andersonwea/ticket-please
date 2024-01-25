import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resourse-not-found-error'
import { SpotAlreadyReservedError } from '@/core/errors/errors/spot-already-reserved-error'
import { Order, OrderStatus } from '../../enterprise/entities/order'
import { OrdersRepository } from '../repositories/orders-repository'
import { CustomersRepository } from '../repositories/customers-repository'
import { EventsRepository } from '../repositories/events-repository'
import { SpotsSectionRepository } from '../repositories/spots-section-repository'
import { StripeGateway } from '@/infra/gateways/stripe-gateway'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { SpotReservation } from '../../enterprise/entities/spot-reservation'
import { SpotsReservationRepository } from '../repositories/spots-reservation-repository'
import { SpotReserveError } from '@/core/errors/errors/spot-reserve-error'
import { EventSectionsRepository } from '../repositories/event-sections-repository'

interface CreateOrderUseCaseRequest {
  customerId: string
  spotSectionId: string
  eventId: string
  sectionId: string
  cardToken: string
}

type CreateOrderUseCaseResponse = Either<
  ResourceNotFoundError | SpotAlreadyReservedError | SpotReserveError,
  {
    order: Order
  }
>

export class CreateOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private customersRepository: CustomersRepository,
    private eventsRepository: EventsRepository,
    private spotsSection: SpotsSectionRepository,
    private spotsReservation: SpotsReservationRepository,
    private eventSectionsRepository: EventSectionsRepository,
    private paymentGateway: StripeGateway,
  ) {}

  async execute({
    customerId,
    spotSectionId,
    eventId,
    sectionId,
    cardToken,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const customer = await this.customersRepository.findById(customerId)

    if (!customer) {
      return left(new ResourceNotFoundError())
    }

    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      return left(new ResourceNotFoundError())
    }

    const section = await this.eventSectionsRepository.findById(sectionId)

    if (!section) {
      return left(new ResourceNotFoundError())
    }

    const spotSection = await this.spotsSection.findById(spotSectionId)

    if (!spotSection) {
      return left(new ResourceNotFoundError())
    }

    if (spotSection.isReserved) {
      return left(new SpotAlreadyReservedError())
    }

    try {
      await this.paymentGateway.createPayment({
        amount: section.price,
        cardToken,
      })

      const order = Order.create({
        amount: section.price,
        customerId: new UniqueEntityId(customerId),
        sectionSpotId: new UniqueEntityId(spotSectionId),
      })

      order.status = OrderStatus.PAID

      await this.ordersRepository.create(order)

      spotSection.isReserved = true

      const spotReservation = SpotReservation.create({
        customerId: new UniqueEntityId(customerId),
        spotId: new UniqueEntityId(spotSectionId),
        eventId: new UniqueEntityId(eventId),
      })

      await this.spotsReservation.create(spotReservation)

      return right({
        order,
      })
    } catch (err) {
      const order = Order.create({
        amount: section.price,
        customerId: new UniqueEntityId(customerId),
        sectionSpotId: new UniqueEntityId(spotSectionId),
      })

      order.status = OrderStatus.CANCELLED

      await this.ordersRepository.create(order)

      return left(new SpotReserveError())
    }
  }
}
