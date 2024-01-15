export interface EmailProps {
  to: string
  subject: string
  content: string
}

export interface EmailGateway {
  sendEmail(data: EmailProps): Promise<void>
}
