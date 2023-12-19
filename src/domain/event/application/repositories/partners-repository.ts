import { Partner } from '../../enterprise/entities/partner'

export interface PartnersRepository {
  create(partner: Partner): Promise<void>
  findById(id: string): Promise<Partner | null>
}
