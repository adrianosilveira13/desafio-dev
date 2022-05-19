import { Authentication } from '@/domain/usecases'
import { LoadAccountByEmailRepository } from '../protocols/db'

export class AuthenticationService implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
    return Promise.resolve(null)
  }
}
