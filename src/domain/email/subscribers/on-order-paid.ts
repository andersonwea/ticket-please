import { EventHandler } from '@/core/events/event-handler'
import { SendEmailUseCase } from '../application/use-cases/send-email'
import { DomainEvents } from '@/core/events/domain-events'
import { EventOrderPaidEvent } from '@/domain/event/enterprise/events/event-order-paid-event'
import { CustomersRepository } from '@/domain/event/application/repositories/customers-repository'

export class OnOrderPaid implements EventHandler {
  constructor(
    private customersRepository: CustomersRepository,
    private sendEmailUseCase: SendEmailUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendOrderPaidEmail.bind(this),
      EventOrderPaidEvent.name,
    )
  }

  private async sendOrderPaidEmail({ order }: EventOrderPaidEvent) {
    const customer = await this.customersRepository.findById(
      order.customerId.toString(),
    )

    if (customer) {
      const email = await this.sendEmailUseCase.execute({
        to: customer.email.value,
        subject: 'Pedido pago',
        content: `Olá ${customer.name}, seu pedido foi pago`,
      })
      console.log(email)
    }
  }
}
