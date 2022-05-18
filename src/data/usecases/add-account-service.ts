import { AddAccount } from '@/domain/usecases'
import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols/db'
import { Hasher } from '@/data/protocols/criptography'

export class AddAccountService implements AddAccount {
  constructor (
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)
    if (!exists) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
    }
    return !exists
  }
}
