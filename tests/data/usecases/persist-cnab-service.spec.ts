import { PersistCNABService } from '@/data/services'
import { mockCNAB } from '@/tests/domain/mocks'
import { CheckTransactionTypeRepositorySpy, SaveTransactionRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: PersistCNABService
  checkTransactionTypeRepositorySpy: CheckTransactionTypeRepositorySpy
  saveTransactionRepositorySpy: SaveTransactionRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkTransactionTypeRepositorySpy = new CheckTransactionTypeRepositorySpy()
  const saveTransactionRepositorySpy = new SaveTransactionRepositorySpy()
  const sut = new PersistCNABService(checkTransactionTypeRepositorySpy, saveTransactionRepositorySpy)
  return {
    sut,
    checkTransactionTypeRepositorySpy,
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
