import { AddAccountService } from '@/data/services'
import { AddAccount } from '@/domain/usecases'
import { BcryptAdapter } from '@/infra/cryptography'
import { PgUserAccountRepository } from '@/infra/postgres/repos'

export const makeAddAccountService = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const userAccountRepository = new PgUserAccountRepository()
  return new AddAccountService(userAccountRepository, bcryptAdapter, userAccountRepository)
}
