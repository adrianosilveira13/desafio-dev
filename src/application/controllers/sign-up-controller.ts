import { AddAccount, Authentication } from '@/domain/usecases'
import { badRequest, forbbiden, ok, serverError } from '@/application/helpers'
import { Validation, HttpResponse } from '@/application/protocols'
import { EmailInUseError } from '@/application/errors'

export class SignUpController {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
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

      const authenticationModel = await this.authentication.auth({ email, password })
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
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
