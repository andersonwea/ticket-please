import { EmailsRepository } from '@/domain/email/application/repositories/emails-repository'
import { Email } from '@/domain/email/enterprise/entities/email'

export class InMemoryEmailsRepository implements EmailsRepository {
  items: Email[] = []

  async create(email: Email) {
    this.items.push(email)
  }
}
