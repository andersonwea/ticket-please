export interface EmailProps {
  recipientId: string
  subject: string
  content: string
}

export interface EmailGateway {
  sendEmail(data: EmailProps): Promise<void>
}
