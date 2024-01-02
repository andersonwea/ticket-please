import {
  CreatePaymentProps,
  PaymentGateway,
} from '@/core/gateways/payment-gateway'

export class StripeGateway implements PaymentGateway {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createPayment(data: CreatePaymentProps): Promise<any> {
    if (data.cardToken === 'invalid_token') {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(null)
    }

    return Promise.resolve(null)
  }
}
