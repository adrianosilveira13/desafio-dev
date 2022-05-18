import { Validation, HttpResponse } from '@/presentation/protocols'

export class SignUpController {
  constructor (private readonly validation: Validation) {}

  async handle (request: SignUpController.HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return {
        statusCode: 400,
        body: {}
      }
    }
  }
}

export namespace SignUpController {
  export type HttpRequest = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
