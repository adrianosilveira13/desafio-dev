import { LoadAccountByTokenService } from '@/data/services'
import { JwtAdapter } from '@/infra/cryptography'
import env from '@/main/config/env'
import { makePgUserAccountRepo } from '@/main/factories/repos'

export const makeLoadAccountByTokenService = (): LoadAccountByTokenService => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new LoadAccountByTokenService(jwtAdapter, makePgUserAccountRepo())
}
