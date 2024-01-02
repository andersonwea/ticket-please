export interface CreatePaymentProps {
  amount: number
  cardToken: string
}

export interface PaymentGateway {
  createPayment(data: CreatePaymentProps): Promise<any>
}
