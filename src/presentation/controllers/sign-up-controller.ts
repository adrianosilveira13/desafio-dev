import { Validation } from '@/presentation/protocols'

export class SignUpController {
  constructor (private readonly validation: Validation) {}

  async handle (request: SignUpController.HttpRequest): Promise<any> {
    this.validation.validate(request)
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
