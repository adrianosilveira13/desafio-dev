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

  it('Should return an array of transactions on success', async () => {
    const { sut } = makeSut()
    const storeId = {
      storeId: faker.datatype.number()
    }
    const response = await sut.loadTransactions(storeId)
    expect(response).toBeTruthy()
  })

  it('Should return null if LoadTransactionsByStoreRepository returns null', async () => {
    const { sut, loadTransactionsByStoreRepositorySpy } = makeSut()
    loadTransactionsByStoreRepositorySpy.result = null
    const storeId = {
      storeId: faker.datatype.number()
    }
    const response = await sut.loadTransactions(storeId)
    expect(response).toBeNull()
  })
})
