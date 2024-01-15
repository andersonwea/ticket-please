import { EmailGateway, EmailProps } from '@/core/gateways/email-gateway'

export class MailtrapGateway implements EmailGateway {
  async sendEmail(data: EmailProps): Promise<void> {
    return Promise.resolve()
  }
}
