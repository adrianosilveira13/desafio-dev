import { AddAccount } from '@/domain/add-account'
import { badRequest } from '@/presentation/helpers'
import { Validation, HttpResponse } from '@/presentation/protocols'

export class SignUpController {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  async handle (request: SignUpController.HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) return badRequest(error)

    const { name, email, password } = request
    const isValid = await this.addAccount.add({
      name,
      email,
      password
    })

    if (!isValid) {
      return {
        statusCode: 403,
        body: new Error()
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
