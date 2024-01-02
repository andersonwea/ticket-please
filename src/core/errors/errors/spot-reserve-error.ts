import { UseCaseError } from '../use-case-error'

export class SpotReserveError extends Error implements UseCaseError {
  constructor() {
    super('An Error ocurried when reserving your spot.')
  }
}
