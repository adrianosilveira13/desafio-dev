import { Controller, HttpResponse, Validation } from '@/application/protocols'
import { Authentication } from '@/domain/usecases'
import { badRequest } from '../helpers'

export class LoginController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: LoginController.HttpRequest): Promise<HttpResponse> {
    const error = await this.validator.validate(request)
    if (error) return badRequest(error)

    const { email, password } = request
    await this.authentication.auth({ email, password })
    return Promise.resolve(null)
  }
}

export namespace LoginController {
  export type HttpRequest = {
    email: string
    password: string
  }
}
