import { PersistCNABService } from '@/data/services'
import { mockCNAB } from '@/tests/domain/mocks'
import { CheckTransactionTypeRepositorySpy, SaveTransactionRepositorySpy } from '@/tests/data/mocks'
import { CheckStoreByNameAndOwnerRepositorySpy } from '../mocks/mock-check-store-by-name-and-owner-repository'

type SutTypes = {
  sut: PersistCNABService
  checkTransactionTypeRepositorySpy: CheckTransactionTypeRepositorySpy
  checkStoreByNameAndOwnerRepositorySpy: CheckStoreByNameAndOwnerRepositorySpy
  saveTransactionRepositorySpy: SaveTransactionRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkTransactionTypeRepositorySpy = new CheckTransactionTypeRepositorySpy()
  const checkStoreByNameAndOwnerRepositorySpy = new CheckStoreByNameAndOwnerRepositorySpy()
  const saveTransactionRepositorySpy = new SaveTransactionRepositorySpy()
  const sut = new PersistCNABService(checkTransactionTypeRepositorySpy, checkStoreByNameAndOwnerRepositorySpy, saveTransactionRepositorySpy)
  return {
    sut,
    checkTransactionTypeRepositorySpy,
    checkStoreByNameAndOwnerRepositorySpy,
    saveTransactionRepositorySpy
  }
}

describe('PersistCNABService', () => {
  it('Should call CheckTransactionTypeRepository with correct values', async () => {
    const { sut, checkTransactionTypeRepositorySpy } = makeSut()
    const validCNAB1 = (mockCNAB())
    const validCNAB2 = (mockCNAB())
    await sut.persist([validCNAB1, validCNAB2])
    expect(checkTransactionTypeRepositorySpy.types[0]).toBe(validCNAB1.type)
    expect(checkTransactionTypeRepositorySpy.types[1]).toBe(validCNAB2.type)
    expect(checkTransactionTypeRepositorySpy.callsCount).toBe(2)
  })

  it('Should return false if CheckTransactionTypeRepository returns false', async () => {
    const { sut, checkTransactionTypeRepositorySpy } = makeSut()
    checkTransactionTypeRepositorySpy.result = false
    const success = await sut.persist([mockCNAB()])
    expect(success).toBe(false)
  })

  it('Should call CheckStoreByNameAndOwnerRepository with correct value', async () => {
    const { sut, checkStoreByNameAndOwnerRepositorySpy } = makeSut()
    const validCNAB1 = (mockCNAB())
    const validCNAB2 = (mockCNAB())
    await sut.persist([validCNAB1, validCNAB2])
    expect(checkStoreByNameAndOwnerRepositorySpy.data[0]).toEqual({ owner: validCNAB1.owner, storeName: validCNAB1.storeName })
    expect(checkStoreByNameAndOwnerRepositorySpy.data[1]).toEqual({ owner: validCNAB2.owner, storeName: validCNAB2.storeName })
    expect(checkStoreByNameAndOwnerRepositorySpy.callsCount).toBe(2)
  })

  it('Should call SaveTransactionRepository with correct values', async () => {
    const { sut, saveTransactionRepositorySpy } = makeSut()
    const validCNAB1 = (mockCNAB())
    const validCNAB2 = (mockCNAB())
    await sut.persist([validCNAB1, validCNAB2])
    expect(saveTransactionRepositorySpy.transactions[0]).toBe(validCNAB1)
    expect(saveTransactionRepositorySpy.transactions[1]).toBe(validCNAB2)
    expect(saveTransactionRepositorySpy.callsCount).toBe(2)
  })

  it('Should return false if SaveTransactionRepository returns false', async () => {
    const { sut, saveTransactionRepositorySpy } = makeSut()
    saveTransactionRepositorySpy.result = false
    const success = await sut.persist([mockCNAB()])
    expect(success).toBe(false)
  })
})
