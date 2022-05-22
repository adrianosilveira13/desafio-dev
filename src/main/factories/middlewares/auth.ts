import { AuthMiddleware } from '@/application/middlewares'
import { Middleware } from '@/application/protocols'
import { makeLoadAccountByTokenService } from '@/main/factories/services'

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeLoadAccountByTokenService())
}
