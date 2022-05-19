import env from '@/main/config/env'
import { JwtAdapter } from '@/infra/cryptography'

export const makeJwtAdapter = (): JwtAdapter => {
  return new JwtAdapter(env.jwtSecret)
}
