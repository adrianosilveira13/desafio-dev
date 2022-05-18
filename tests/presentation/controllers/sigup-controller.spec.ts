export interface Validation {
  validate: (input: any) => Error
}

export class ValidationSpy implements Validation {
  error: Error = null
  input: any

  validate (input: any): Error {
    this.input = input
    return this.error
  }
}

class SignUpController {
  constructor (private readonly validation: Validation) {}

  async handle (request: any): Promise<any> {
    this.validation.validate(request)
  }
}

describe('SignUp Controller', () => {
  it('Should call Validation with correct values', async () => {
    const validationSpy = new ValidationSpy()
    const sut = new SignUpController(validationSpy)
    const request = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
