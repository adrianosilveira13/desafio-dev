import { Controller, HttpResponse, Validation } from '@/application/protocols'
import { badRequest } from '../helpers'

export class LoginController implements Controller {
  constructor (
    private readonly validator: Validation
  ) {}

  async handle (request: LoginController.HttpRequest): Promise<HttpResponse> {
    const error = await this.validator.validate(request)
    if (error) return badRequest(error)
    return Promise.resolve(null)
  }
}

export namespace LoginController {
  export type HttpRequest = {
    email: string
    password: string
  }
}
