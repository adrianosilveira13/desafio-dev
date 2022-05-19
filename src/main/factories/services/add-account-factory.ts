import { AddAccountService } from '@/data/services'
import { AddAccount } from '@/domain/usecases'
import { makeBcryptAdapter } from '../crypto'
import { makePgUserAccountRepo } from '../repos'

export const makeAddAccountService = (): AddAccount => {
  return new AddAccountService(makePgUserAccountRepo(), makeBcryptAdapter(), makePgUserAccountRepo())
}
