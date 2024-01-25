import { EventHandler } from '@/core/events/event-handler'
import { SendEmailUseCase } from '../application/use-cases/send-email'
import { DomainEvents } from '@/core/events/domain-events'
import { CustomersRepository } from '@/domain/event/application/repositories/customers-repository'
import { EventDateChangedEvent } from '@/domain/event/enterprise/events/event-date-changed-event'
import { SpotsReservationRepository } from '@/domain/event/application/repositories/spots-reservation-repository'

export class OnEventDateChanged implements EventHandler {
  constructor(
    private spotsReservation: SpotsReservationRepository,
    private customersRepository: CustomersRepository,
    private sendEmailUseCase: SendEmailUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendEventDateChangedEmail.bind(this),
      EventDateChangedEvent.name,
    )
  }

  private async sendEventDateChangedEmail({
    event,
    date,
  }: EventDateChangedEvent) {
    const reservations = await this.spotsReservation.findAllByEventId(
      event.id.toString(),
    )

    for (const resevation of reservations) {
      const customer = await this.customersRepository.findById(
        resevation.customerId.toString(),
      )

      await this.sendEmailUseCase.execute({
        to: customer?.email.value || '',
        subject: 'Data do evento alterada',
        content: `Olá ${customer?.name}, a data do event ${event.name} foi alterada para ${date}`,
      })
    }
  }
}
