import { SignUpController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'

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
