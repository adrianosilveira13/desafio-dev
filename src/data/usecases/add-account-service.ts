import { AddAccount } from '@/domain/usecases'
import { CheckAccountByEmailRepository } from '@/data/protocols/db'

export class AddAccountService implements AddAccount {
  constructor (private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository) {}

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    await this.checkAccountByEmailRepository.checkByEmail(accountData.email)
    return Promise.resolve(null)
  }
}
