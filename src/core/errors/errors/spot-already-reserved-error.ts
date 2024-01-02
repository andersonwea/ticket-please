import { UseCaseError } from '../use-case-error'

export class SpotAlreadyReservedError extends Error implements UseCaseError {
  constructor() {
    super('Spot already reserved.')
  }
}
