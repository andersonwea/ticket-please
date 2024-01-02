import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export enum OrderStatus {
  PENDING,
  PAID,
  CANCELLED,
}

interface OrderProps {
  customerId: UniqueEntityId
  amount: number
  sectionSpotId: UniqueEntityId
  status: OrderStatus
}

export class Order extends Entity<OrderProps> {
  get customerId() {
    return this.props.customerId
  }

  get amount() {
    return this.props.amount
  }

  get sectionSpotId() {
    return this.props.sectionSpotId
  }

  get status() {
    return this.props.status
  }

  set status(status: OrderStatus) {
    this.props.status = status
  }

  static create(props: Optional<OrderProps, 'status'>, id?: UniqueEntityId) {
    const order = new Order(
      {
        ...props,
        status: props.status ?? OrderStatus.PENDING,
      },
      id,
    )

    return order
  }
}
