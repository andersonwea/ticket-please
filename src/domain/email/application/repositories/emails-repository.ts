import { Email } from '../../enterprise/entities/email'

export interface EmailsRepository {
  create(email: Email): Promise<void>
}
