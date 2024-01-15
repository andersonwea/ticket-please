import { EmailGateway } from '@/core/gateways/email-gateway'
import { SendEmailUseCase } from './send-email'
import { InMemoryEmailsRepository } from '@/test/repositories/in-memory-emails-repository'
import { MailtrapGateway } from '@/infra/gateways/mailtrap-gateway'

let inMemoryEmailsRepository: InMemoryEmailsRepository
let mailtrapGateway: EmailGateway
let sut: SendEmailUseCase

describe('Send Email Use Case', () => {
  beforeEach(() => {
    inMemoryEmailsRepository = new InMemoryEmailsRepository()
    mailtrapGateway = new MailtrapGateway()
    sut = new SendEmailUseCase(inMemoryEmailsRepository, mailtrapGateway)
  })

  it('should be able to send email', async () => {
    const result = await sut.execute({
      recipientId: '1',
      subject: 'Titulo do email',
      content: 'Conteúdo da email',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryEmailsRepository.items[0]).toEqual(result.value?.email)
  })
})
