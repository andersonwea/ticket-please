import { SpotsReservationRepository } from '@/domain/event/application/repositories/spots-reservation-repository'
import { SpotReservation } from '@/domain/event/enterprise/entities/spot-reservation'

export class InMemorySpotsReservationRepository
  implements SpotsReservationRepository
{
  items: SpotReservation[] = []

  async findAllByEventId(eventId: string): Promise<SpotReservation[]> {
    const reservations = this.items.filter(
      (reservation) => reservation.eventId.toString() === eventId,
    )

    return reservations
  }

  async create(spotReservation: SpotReservation): Promise<void> {
    this.items.push(spotReservation)
  }
}
