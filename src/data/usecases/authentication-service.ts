import { Authentication } from '@/domain/usecases'
import { LoadAccountByEmailRepository } from '../protocols/db'

export class AuthenticationService implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
    if (account) {
      return {
        accessToken: 'any_token',
        name: 'any_name'
      }
    }
    return null
  }
}
