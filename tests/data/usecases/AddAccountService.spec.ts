import { AddAccountService } from '@/data/usecases'
import { CheckAccountByEmailRepositorySpy } from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: AddAccountService
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const sut = new AddAccountService(checkAccountByEmailRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy
  }
}

describe('AddAccountService', () => {
  it('Should call CheckAccountByEmailRepository with correct value', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    const params = mockAddAccountParams()
    await sut.add(params)
    expect(checkAccountByEmailRepositorySpy.email).toBe(params.email)
  })
})
