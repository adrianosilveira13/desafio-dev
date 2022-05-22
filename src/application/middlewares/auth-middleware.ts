import { AccessDeniedError } from '@/application/errors'
import { forbbiden, ok, serverError } from '@/application/helpers'
import { HttpResponse, Middleware } from '@/application/protocols'
import { LoadAccountByToken } from '@/domain/usecases'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accesstoken } = request
      if (accesstoken) {
        const account = await this.loadAccountByToken.load(accesstoken)
        if (account) {
          return ok({ accountId: account.id })
        }
      }
      return forbbiden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accesstoken?: string
  }
}
