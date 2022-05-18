import { AddAccount } from '@/domain/add-account'
import { badRequest, forbbiden } from '@/presentation/helpers'
import { Validation, HttpResponse } from '@/presentation/protocols'
import { EmailInUseError } from '@/presentation/errors'

export class SignUpController {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  async handle (request: SignUpController.HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) return badRequest(error)

      const { name, email, password } = request
      const isValid = await this.addAccount.add({
        name,
        email,
        password
      })

      if (!isValid) return forbbiden(new EmailInUseError())
    } catch (error) {
      return {
        statusCode: 500,
        body: error
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
