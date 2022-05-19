import env from '@/main/config/env'
import { AuthenticationService } from '@/data/services'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { makePgUserAccountRepo } from '@/main/factories/repos'

export const makeAuthenticationService = (): AuthenticationService => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdatper = new JwtAdapter(env.jwtSecret)
  return new AuthenticationService(makePgUserAccountRepo(), bcryptAdapter, jwtAdatper, makePgUserAccountRepo())
}
