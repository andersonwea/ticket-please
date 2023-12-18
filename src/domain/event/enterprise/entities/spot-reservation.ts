import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface SpotReservationProps {
  spotId: UniqueEntityId
  customerId: UniqueEntityId
  reservationDate: Date
}

export class SpotReservation extends Entity<SpotReservationProps> {
  get spotId() {
    return this.props.spotId
  }

  get customerId() {
    return this.props.customerId
  }

  set customerId(customerId: UniqueEntityId) {
    this.props.customerId = customerId
  }

  get reservationDate() {
    return this.props.reservationDate
  }

  set reservationDate(reservationDate: Date) {
    this.props.reservationDate = reservationDate
  }

  static create(
    props: Optional<SpotReservationProps, 'reservationDate'>,
    id?: UniqueEntityId,
  ) {
    const reservation = new SpotReservation(
      {
        ...props,
        reservationDate: props.reservationDate ?? new Date(),
      },
      id,
    )

    return reservation
  }
}
