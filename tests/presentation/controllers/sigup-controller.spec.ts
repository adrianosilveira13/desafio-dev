import { SignUpController } from '@/presentation/controllers'
import { ValidationSpy, AddAccountSpy } from '@/tests/presentation/mocks'
import { badRequest } from '@/presentation/helpers/http-helper'
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
  addAccountSpy: AddAccountSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addAccountSpy = new AddAccountSpy()
  const sut = new SignUpController(validationSpy, addAccountSpy)
  return {
    sut,
    validationSpy,
    addAccountSpy
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
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  it('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addAccountSpy.addAccountParams).toEqual({
      name: request.name,
      email: request.email,
      password: request.password
    })
  })

  it('Should return 403 if AddAccount returns false', async () => {
    const { sut, addAccountSpy } = makeSut()
    addAccountSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual({
      statusCode: 403,
      body: new Error()
    })
  })
})
