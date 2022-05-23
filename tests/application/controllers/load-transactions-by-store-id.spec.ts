import { LoadTransactionByStoreController } from '@/application/controllers'
import { LoadTransactionByStoreSpy } from '@/tests/application/mocks'
import { notFound } from '@/application/helpers'
import faker from '@faker-js/faker'

const mockRequest = (): LoadTransactionByStoreController.Params => ({
  storeId: faker.datatype.number()
})

type SutTypes = {
  sut: LoadTransactionByStoreController
  loadTransactionByStoreSpy: LoadTransactionByStoreSpy
}

const makeSut = (): SutTypes => {
  const loadTransactionByStoreSpy = new LoadTransactionByStoreSpy()
  const sut = new LoadTransactionByStoreController(loadTransactionByStoreSpy)
  return {
    sut,
    loadTransactionByStoreSpy
  }
}

describe('LoadTransactionByStoreController', () => {
  it('Should call LoadTransactionByStore with correct values', async () => {
    const { sut, loadTransactionByStoreSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadTransactionByStoreSpy.input).toEqual(request)
  })

  it('Should return not found if LoadTransactionByStore returns null', async () => {
    const { sut, loadTransactionByStoreSpy } = makeSut()
    loadTransactionByStoreSpy.result = null
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(notFound())
  })
})
