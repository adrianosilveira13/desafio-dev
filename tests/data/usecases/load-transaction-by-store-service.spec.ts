import { LoadTransactionByStoreService } from '@/data/services'
import faker from '@faker-js/faker'
import { LoadTransactionsByStoreRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: LoadTransactionByStoreService
  loadTransactionsByStoreRepositorySpy: LoadTransactionsByStoreRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadTransactionsByStoreRepositorySpy = new LoadTransactionsByStoreRepositorySpy()
  const sut = new LoadTransactionByStoreService(loadTransactionsByStoreRepositorySpy)
  return {
    sut,
    loadTransactionsByStoreRepositorySpy
  }
}

describe('LoadTransactionByStoreService Usecase', () => {
  it('Should call LoadTransactionsByStoreRepository with correct values', async () => {
    const { sut, loadTransactionsByStoreRepositorySpy } = makeSut()
    const storeId = {
      storeId: faker.datatype.number()
    }
    await sut.loadTransactions(storeId)
    expect(loadTransactionsByStoreRepositorySpy.input).toEqual(storeId)
  })
})
