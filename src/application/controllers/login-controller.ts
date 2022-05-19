import { Controller, HttpResponse, Validation } from '@/application/protocols'
import { badRequest, ok, serverError, unauthorized } from '@/application/helpers'
import { Authentication } from '@/domain/usecases'

export class LoginController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: LoginController.HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validator.validate(request)
      if (error) return badRequest(error)

      const { email, password } = request
      const authenticationModel = await this.authentication.auth({ email, password })
      if (!authenticationModel) return unauthorized()

      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type HttpRequest = {
    email: string
    password: string
  }
}
