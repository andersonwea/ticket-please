import { PartnersRepository } from '@/domain/event/application/repositories/partners-repository'
import { Partner } from '@/domain/event/enterprise/entities/partner'

export class InMemoryPartnersRepository implements PartnersRepository {
  items: Partner[] = []

  async create(partner: Partner): Promise<void> {
    this.items.push(partner)
  }

  async findById(id: string): Promise<Partner | null> {
    const partner = this.items.find((partner) => partner.id.toString() === id)

    if (!partner) {
      return null
    }

    return partner
  }
}
