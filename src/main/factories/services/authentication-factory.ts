import env from '@/main/config/env'
import { AuthenticationService } from '@/data/services'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { PgUserAccountRepository } from '@/infra/postgres/repos'

export const makeAuthenticationService = (): AuthenticationService => {
  const salt = 12
  const pgUserAccountRepository = new PgUserAccountRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdatper = new JwtAdapter(env.jwtSecret)
  return new AuthenticationService(pgUserAccountRepository, bcryptAdapter, jwtAdatper, pgUserAccountRepository)
}
