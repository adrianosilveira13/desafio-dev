import { Authentication } from '@/domain/usecases'
import { Encrypter, HashComparer } from '@/data/protocols/criptography'
import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols/db'

export class AuthenticationService implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, account.password)
      if (isValid) {
        const accesstoken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accesstoken)
        return {
          accesstoken,
          name: account.name
        }
      }
    }
    return null
  }
}
