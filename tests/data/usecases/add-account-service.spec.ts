import { AddAccountService } from '@/data/usecases'
import { AddAccountRepositorySpy, CheckAccountByEmailRepositorySpy, HasherSpy } from '@/tests/data/mocks'
import { mockAddAccountParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: AddAccountService
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new AddAccountService(checkAccountByEmailRepositorySpy, hasherSpy, addAccountRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy,
    hasherSpy,
    addAccountRepositorySpy
  }
}

describe('AddAccountService', () => {
  it('Should call CheckAccountByEmailRepository with correct value', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(checkAccountByEmailRepositorySpy.email).toBe(addAccountParams.email)
  })

  it('Should return false if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.result = true
    const isValid = await sut.add(mockAddAccountParams())
    expect(isValid).toBe(false)
  })

  it('Should call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(hasherSpy.plaintext).toBe(addAccountParams.password)
  })

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(addAccountRepositorySpy.addAccountParams).toEqual({
      name: addAccountParams.name,
      email: addAccountParams.email,
      password: hasherSpy.digest
    })
  })
})
