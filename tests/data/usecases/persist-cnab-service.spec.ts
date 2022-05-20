import { PersistCNABService } from '@/data/services'
import { mockCNAB } from '@/tests/domain/mocks'
import { CheckTransactionTypeRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: PersistCNABService
  checkTransactionTypeRepositorySpy: CheckTransactionTypeRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkTransactionTypeRepositorySpy = new CheckTransactionTypeRepositorySpy()
  const sut = new PersistCNABService(checkTransactionTypeRepositorySpy)
  return {
    sut,
    checkTransactionTypeRepositorySpy
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
})
