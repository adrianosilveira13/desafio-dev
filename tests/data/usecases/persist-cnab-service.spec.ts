import { PersistCNABService } from '@/data/services'
import { mockCNAB } from '@/tests/domain/mocks'
import { CheckStoreByNameAndOwnerRepositorySpy, CheckTransactionTypeRepositorySpy, CreateStoreRepositorySpy, SaveTransactionRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: PersistCNABService
  checkTransactionTypeRepositorySpy: CheckTransactionTypeRepositorySpy
  checkStoreByNameAndOwnerRepositorySpy: CheckStoreByNameAndOwnerRepositorySpy
  createStoreRepositorySpy: CreateStoreRepositorySpy
  saveTransactionRepositorySpy: SaveTransactionRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkTransactionTypeRepositorySpy = new CheckTransactionTypeRepositorySpy()
  const checkStoreByNameAndOwnerRepositorySpy = new CheckStoreByNameAndOwnerRepositorySpy()
  const createStoreRepositorySpy = new CreateStoreRepositorySpy()
  const saveTransactionRepositorySpy = new SaveTransactionRepositorySpy()
  const sut = new PersistCNABService(checkTransactionTypeRepositorySpy, checkStoreByNameAndOwnerRepositorySpy, createStoreRepositorySpy, saveTransactionRepositorySpy)
  return {
    sut,
    checkTransactionTypeRepositorySpy,
    checkStoreByNameAndOwnerRepositorySpy,
    createStoreRepositorySpy,
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
    const store1 = { owner: validCNAB1.owner, storeName: validCNAB1.storeName }
    const store2 = { owner: validCNAB2.owner, storeName: validCNAB2.storeName }
    await sut.persist([validCNAB1, validCNAB2])
    expect(checkStoreByNameAndOwnerRepositorySpy.data[0]).toEqual(store1)
    expect(checkStoreByNameAndOwnerRepositorySpy.data[1]).toEqual(store2)
    expect(checkStoreByNameAndOwnerRepositorySpy.callsCount).toBe(2)
  })

  it('Should call SaveTransactionRepository with existing store if CheckStoreByNameAndOwnerRepository returns an id', async () => {
    const { sut, saveTransactionRepositorySpy, checkStoreByNameAndOwnerRepositorySpy } = makeSut()
    const { result: { id } } = checkStoreByNameAndOwnerRepositorySpy
    const validCNAB1 = (mockCNAB())
    const validCNAB2 = (mockCNAB())
    await sut.persist([validCNAB1, validCNAB2])
    expect(saveTransactionRepositorySpy.transactions[0]).toEqual({ cnab: validCNAB1, storeId: id })
    expect(saveTransactionRepositorySpy.transactions[1]).toEqual({ cnab: validCNAB2, storeId: id })
    expect(saveTransactionRepositorySpy.callsCount).toBe(2)
  })

  it('Should call CreateStoreRepository if CheckStoreByNameAndOwnerRepository returns null', async () => {
    const { sut, checkStoreByNameAndOwnerRepositorySpy, createStoreRepositorySpy } = makeSut()
    checkStoreByNameAndOwnerRepositorySpy.result = null
    const validCNAB1 = (mockCNAB())
    const validCNAB2 = (mockCNAB())
    const store1 = { owner: validCNAB1.owner, storeName: validCNAB1.storeName }
    const store2 = { owner: validCNAB2.owner, storeName: validCNAB2.storeName }
    await sut.persist([validCNAB1, validCNAB2])
    expect(createStoreRepositorySpy.data[0]).toEqual(store1)
    expect(createStoreRepositorySpy.data[1]).toEqual(store2)
    expect(createStoreRepositorySpy.callsCount).toBe(2)
  })

  it('Should call SaveTransactionRepository with id from CreateStoreRepository', async () => {
    const { sut, saveTransactionRepositorySpy, checkStoreByNameAndOwnerRepositorySpy, createStoreRepositorySpy } = makeSut()
    checkStoreByNameAndOwnerRepositorySpy.result = null
    const { result: { id } } = createStoreRepositorySpy
    const validCNAB1 = (mockCNAB())
    const validCNAB2 = (mockCNAB())
    await sut.persist([validCNAB1, validCNAB2])
    expect(saveTransactionRepositorySpy.transactions[0]).toEqual({ cnab: validCNAB1, storeId: id })
    expect(saveTransactionRepositorySpy.transactions[1]).toEqual({ cnab: validCNAB2, storeId: id })
    expect(saveTransactionRepositorySpy.callsCount).toBe(2)
  })

  it('Should return false if SaveTransactionRepository returns false', async () => {
    const { sut, saveTransactionRepositorySpy } = makeSut()
    saveTransactionRepositorySpy.result = false
    const success = await sut.persist([mockCNAB()])
    expect(success).toBe(false)
  })

  it('Should return false if SaveTransactionRepository returns false and CheckStoreByNameAndOwnerRepository returns null', async () => {
    const { sut, saveTransactionRepositorySpy, checkStoreByNameAndOwnerRepositorySpy } = makeSut()
    checkStoreByNameAndOwnerRepositorySpy.result = null
    saveTransactionRepositorySpy.result = false
    const success = await sut.persist([mockCNAB()])
    expect(success).toBe(false)
  })
})
