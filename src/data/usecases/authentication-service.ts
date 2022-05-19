import { Authentication } from '@/domain/usecases'
import { HashComparer } from '@/data/protocols/criptography'
import { LoadAccountByEmailRepository } from '@/data/protocols/db'

export class AuthenticationService implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
    if (account) {
      await this.hashComparer.compare(authenticationParams.password, account.password)
      return {
        accessToken: 'any_token',
        name: 'any_name'
      }
    }
    return null
  }
}
