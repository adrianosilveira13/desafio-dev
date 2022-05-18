import { AddAccount } from '@/domain/usecases'
import { CheckAccountByEmailRepository } from '@/data/protocols/db'
import { Hasher } from '@/data/protocols/criptography'

export class AddAccountService implements AddAccount {
  constructor (
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher
  ) {}

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)
    if (!exists) {
      await this.hasher.hash(accountData.password)
    }
    return !exists
  }
}
