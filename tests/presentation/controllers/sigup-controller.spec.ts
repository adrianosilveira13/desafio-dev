import { SignUpController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'
import faker from '@faker-js/faker'

const mockRequest = (): SignUpController.HttpRequest => {
  const password = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

type SutTypes = {
  sut: SignUpController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new SignUpController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('SignUp Controller', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(400)
  })
})
