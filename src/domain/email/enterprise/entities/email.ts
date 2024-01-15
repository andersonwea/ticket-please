import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface EmailProps {
  to: string
  subject: string
  content: string
  createdAt: Date
  sentAt?: Date
}

export class Email extends Entity<EmailProps> {
  get recipientId() {
    return this.props.to
  }

  get subject() {
    return this.props.subject
  }

  set subject(subject: string) {
    this.props.subject = subject
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get sentAt() {
    return this.props.sentAt
  }

  send() {
    this.props.sentAt = new Date()
  }

  static create(props: Optional<EmailProps, 'createdAt'>, id?: UniqueEntityId) {
    const email = new Email(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return email
  }
}
