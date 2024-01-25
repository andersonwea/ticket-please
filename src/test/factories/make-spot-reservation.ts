import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  SpotReservation,
  SpotReservationProps,
} from '@/domain/event/enterprise/entities/spot-reservation'

export function makeSpotReservation(
  override: Partial<SpotReservationProps> = {},
  id?: UniqueEntityId,
) {
  const spotReservation = SpotReservation.create(
    {
      customerId: new UniqueEntityId(),
      spotId: new UniqueEntityId(),
      eventId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return spotReservation
}
