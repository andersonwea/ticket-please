import { SpotsReservationRepository } from '@/domain/event/application/repositories/spots-reservation-repository'
import { SpotReservation } from '@/domain/event/enterprise/entities/spot-reservation'

export class InMemorySpotsReservationRepository
  implements SpotsReservationRepository
{
  items: SpotReservation[] = []

  async create(spotReservation: SpotReservation): Promise<void> {
    this.items.push(spotReservation)
  }
}
