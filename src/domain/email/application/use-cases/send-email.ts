import { Either, right } from '@/core/either'
import { Email } from '../../enterprise/entities/email'
import { EmailsRepository } from '../repositories/emails-repository'
import { EmailGateway } from '@/core/gateways/email-gateway'

export interface SendEmailUseCaseRequest {
  to: string
  subject: string
  content: string
}

export type SendEmailUseCaseResponse = Either<
  null,
  {
    email: Email
  }
>

export class SendEmailUseCase {
  constructor(
    private emailsRepository: EmailsRepository,
    private mailtrapGateway: EmailGateway,
  ) {}

  async execute({
    to,
    subject,
    content,
  }: SendEmailUseCaseRequest): Promise<SendEmailUseCaseResponse> {
    const email = Email.create({
      to,
      subject,
      content,
    })

    await this.emailsRepository.create(email)

    await this.mailtrapGateway.sendEmail({
      to,
      subject,
      content,
    })

    email.send()

    return right({
      email,
    })
  }
}
