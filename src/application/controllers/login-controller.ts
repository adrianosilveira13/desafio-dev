import { Controller, HttpResponse, Validation } from '@/application/protocols'

export class LoginController implements Controller {
  constructor (
    private readonly validator: Validation
  ) {}

  async handle (request: LoginController.HttpRequest): Promise<HttpResponse> {
    await this.validator.validate(request)
    return Promise.resolve(null)
  }
}

export namespace LoginController {
  export type HttpRequest = {
    email: string
    password: string
  }
}
