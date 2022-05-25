import { forbbiden, ok, serverError } from '@/application/helpers'
import { AccessDeniedError } from '@/application/errors'
import { AuthMiddleware } from '@/application/middlewares'
import { throwError } from '@/tests/domain/mocks'
import { LoadAccountByTokenSpy } from '@/tests/application/mocks'

const mockRequest = (): AuthMiddleware.Request => ({
  accesstoken: 'any_token'
})

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenSpy: LoadAccountByTokenSpy
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new AuthMiddleware(loadAccountByTokenSpy)
  return {
    sut,
    loadAccountByTokenSpy
  }
}

describe('Auth Middleware', () => {
  it('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbbiden(new AccessDeniedError()))
  })

  it('Should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(mockRequest())
    expect(loadAccountByTokenSpy.accessToken).toBe(request.accesstoken)
  })

  it('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    loadAccountByTokenSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbbiden(new AccessDeniedError()))
  })

  it('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ accountId: loadAccountByTokenSpy.result.id }))
  })

  it('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    jest.spyOn(loadAccountByTokenSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
