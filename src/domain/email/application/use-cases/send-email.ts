import { Either, right } from '@/core/either'
import { Email } from '../../enterprise/entities/email'
import { EmailsRepository } from '../repositories/emails-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EmailGateway } from '@/core/gateways/email-gateway'

export interface SendEmailUseCaseRequest {
  recipientId: string
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
    recipientId,
    subject,
    content,
  }: SendEmailUseCaseRequest): Promise<SendEmailUseCaseResponse> {
    const email = Email.create({
      recipientId: new UniqueEntityId(recipientId),
      subject,
      content,
    })

    await this.emailsRepository.create(email)

    await this.mailtrapGateway.sendEmail({
      recipientId,
      subject,
      content,
    })

    email.send()

    return right({
      email,
    })
  }
}
