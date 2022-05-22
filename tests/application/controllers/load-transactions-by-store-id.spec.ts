import { LoadTransactionByStoreController } from '@/application/controllers'
import { LoadTransactionByStoreSpy } from '@/tests/application/mocks'
import faker from '@faker-js/faker'

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
    const request = {
      storeId: faker.datatype.number()
    }
    await sut.handle(request)
    expect(loadTransactionByStoreSpy.input).toEqual(request)
  })
})
