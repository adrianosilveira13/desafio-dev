import { LoginController } from '@/application/controllers'
import { ValidationSpy } from '@/tests/application/mocks'
import faker from '@faker-js/faker'

const mockRequest = (): LoginController.HttpRequest => {
  const password = faker.internet.password()
  return {
    email: faker.internet.email(),
    password
  }
}

type SutTypes = {
  sut: LoginController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('Login Controller', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
