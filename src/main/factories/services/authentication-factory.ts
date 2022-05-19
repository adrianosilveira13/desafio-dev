import { AuthenticationService } from '@/data/services'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { makeBcryptAdapter, makeJwtAdapter } from '../crypto'

export const makeAuthenticationService = (): AuthenticationService => {
  return new AuthenticationService(makePgUserAccountRepo(), makeBcryptAdapter(), makeJwtAdapter(), makePgUserAccountRepo())
}
