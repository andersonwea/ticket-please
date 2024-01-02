import { SpotReservation } from '../../enterprise/entities/spot-reservation'

export interface SpotsReservationRepository {
  create(spotReservation: SpotReservation): Promise<void>
}
